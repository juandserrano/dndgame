<template>
  <div>
    <Status
      :playMaxHP="player.maxHP"
      :playCurrHP="player.currHP"
      :monMaxHP="monster.hit_points"
      :monCurrHP="monCurrHP"
      :playerName="player.name"
      :monsterName="monster.name"
      :gameResetting="gameResetting"
      :playerMod="player.attackModifier"
      :playerCON="player.CON"
      :monsterMod="monAttackModifier"
      :monsterCON="monCON"
      :equipedWeapon="player.currWeapon"
      :monPortrait="monPortrait"
      class="status"
    />
    <div class="actionbar text-center" v-if="!turnInProgress">
      <button class="attack" @click="attack">Attack</button>
      <button
        class="special"
        @click="specialAttack"
        v-if="player.activeSpecial"
      >
        Special Attack
      </button>
      <button class="heal" @click="heal" v-if="player.activeHeal">Heal</button>
    </div>
    <div class="actionbar transparentactionbar text-center" v-else>
      <button class="attack">Attack</button>
      <button class="special" v-if="player.activeSpecial">
        Special Attack
      </button>
      <button class="heal" v-if="player.activeHeal">Heal</button>
    </div>
    <Log v-if="attackLog.length > 0" :attackLog="attackLog" />
  </div>
</template>

<script>
import Status from "./components/Status";
import Log from "./components/attackLog";
import { d, attackRoll, damageRoll, weaponAttack } from "./scripts/dice";
import regeneratorRuntime from "regenerator-runtime";
const backendPort = process.env.PORT || 3000;
let serverIp = '';
if(process.env.PORT){serverIp = ''}else{serverIp = `http://127.0.0.1:${backendPort}`};

export default {
  components: { Status, Log },
  data: () => {
    return {
      player: {
        currHP: Number,
        maxHP: Number,
        level: Number,
        name: String,
        countToHeal: 0,
        activeSpecial: false,
        activeHeal: false,
        currWeapon: "shortsword",
        CON: 10,
        attackModifier: d(6)
      },
      monster: {},
      monCurrHP: Number,
      allMonsters: [],
      attackLog: [],
      lastPoint: Number,
      turnInProgress: false,
      gameResetting: false,
      monCON: Number,//d(15),
      monAttackModifier: Number,//d(8),
      monPortrait: String
    };
  },
  methods: {
    attack() {
      this.turnInProgress = true;
      if (attackRoll(this.player.attackModifier, this.monCON)) {
        this.lastPoint = weaponAttack(this.player.currWeapon);
      } else {
        this.lastPoint = 0;
      }
      this.monCurrHP -= this.lastPoint;
      if (this.lastPoint == 0) {
        this.attackLog.unshift({
          text: `${this.player.name} misses his attack!`,
          type: "playerAttack"
        });
      } else {
        this.attackLog.unshift({
          text: `${this.player.name} hits ${this.monster.name} for ${this.lastPoint} HP`,
          type: "playerAttack"
        });
      }
      if (this.winLose()) {
        return;
      }
      setTimeout(this.monsterAttack, 500);
      setTimeout(() => (this.turnInProgress = false), 500);
    },
    specialAttack() {
      this.turnInProgress = true;
      if (attackRoll(this.player.attackModifier, this.monCON)) {
        this.lastPoint = weaponAttack(this.player.currWeapon) + d(8);
      } else {
        this.lastPoint = 0;
      }
      this.monCurrHP -= this.lastPoint;
      if (this.lastPoint == 0) {
        this.attackLog.unshift({
          text: `${this.player.name} misses his attack!`,
          type: "playerSpecialAttack"
        });
      } else {
        this.attackLog.unshift({
          text: `${this.player.name} deals a powerfull blow to ${this.monster.name} for ${this.lastPoint} HP`,
          type: "playerSpecialAttack"
        });
      }
      this.player.activeSpecial = false;
      if (this.winLose()) {
        return;
      }
      setTimeout(this.monsterAttack, 500);
      setTimeout(() => (this.turnInProgress = false), 500);
    },
    monsterAttack() {
      if (attackRoll(this.monAttackModifier, this.player.CON)) {
        this.lastPoint = weaponAttack("monster");
      } else {
        this.lastPoint = 0;
      }

      //this.lastPoint = damageRoll(1,12,3,10);
      this.player.currHP -= this.lastPoint;
      if (this.lastPoint == 0) {
        this.attackLog.unshift({
          text: `${this.monster.name} misses his attack!`,
          type: "monsterAttack"
        });
      } else {
        this.attackLog.unshift({
          text: `${this.monster.name} attacks ${this.player.name} for ${this.lastPoint} HP`,
          type: "monsterAttack"
        });
      }

      if (this.player.countToHeal > 0) {
        this.player.countToHeal -= 1;
      }
      if (this.winLose()) {
        return;
      }
      if (Math.random() < 0.2) {
        this.player.activeSpecial = !this.player.activeSpecial;
      }
    },
    // damage(min, max){
    //   let damage = Math.max((Math.floor(Math.random()*max)+1),min);
    //   return damage;
    // },
    heal() {
      this.turnInProgress = true;
      this.lastPoint = Math.max(Math.floor(Math.random() * 7) + 1, 2);
      this.player.currHP += this.lastPoint;
      this.attackLog.unshift({
        text: `${this.player.name} heals for ${this.lastPoint} HP`,
        type: "playerHeals"
      });
      this.player.countToHeal = 4;
      setTimeout(this.monsterAttack, 500);
      setTimeout(() => (this.turnInProgress = false), 500);
      if (this.winLose()) {
        return;
      }
    },
    winLose() {
      if (this.player.currHP < 1) {
        alert("You Lose...");
        this.resetGame();
        return true;
      } else if (this.monCurrHP < 1) {
        alert("You Win!");
        this.resetGame();
        return true;
      } else {
        return false;
      }
    },
    async resetGame() {
      //SET UP RANDOM MONSTER
      let mons = await this.randomMonster();
      this.monster = mons.monster;
      this.monPortrait = mons.portraitUrl;
      this.monCurrHP = this.monster.hit_points;
      this.gameResetting = !this.gameResetting;
      this.monCON = this.monster.armor_class;
      this.monAttackModifier = d(8);

      //RESET PLAYER & LOG
      this.player.activeSpecial = false;
      this.player.activeHeal = false;
      this.player.countToHeal = 0;
      this.player.maxHP = 150;
      this.player.currHP = this.player.maxHP;
      this.attackLog = [];
      this.turnInProgress = false;
    },
    randomMonster: async () => {
      let res = await fetch(serverIp + `/api`);
      let data = await res.json();
      return data;
    },
    randomDice(sides) {
      return Math.floor(Math.random() * (sides + 1));
    }
  },
  watch: {
    //CHECK TO SEE IF HEALING IS AVAILABLE TO THE PLAYER
    "player.currHP": function() {
      if (
        this.player.currHP < this.player.maxHP &&
        this.player.countToHeal == 0
      ) {
        this.player.activeHeal = true;
      } else {
        this.player.activeHeal = false;
      }
    }
  },
  mounted() {
    //START NEW GAME
    this.resetGame();
    do {
      this.player.name = prompt(
        "Welcome!\nPlease enter your adventurers name:"
      );
    } while (this.player.name == "");
  }
};
</script>

<style>
.status {
  margin-top: 30px;
}

.transparentactionbar {
  opacity: 0.4;
  padding: 20px;
  transition: 200ms;
}

.actionbar {
  padding: 20px;
  transition: 200ms;
}

.attack {
  box-shadow: 0px 0px 5px rgb(0, 60, 255);
  border: 1px solid rgb(0, 81, 255);
  background-color: rgb(167, 198, 255);
}

.special {
  box-shadow: 0px 0px 5px rgb(255, 218, 6);
  border: 1px solid rgb(255, 166, 0);
  background-color: rgb(255, 244, 148);
}

.heal {
  box-shadow: 0px 0px 5px rgb(30, 255, 0);
  border: 1px solid rgb(0, 187, 0);
  background-color: rgb(157, 255, 161);
}

button {
  border-radius: 5px;
}

body {
  background: url("https://cdn.glitch.com/526b66c2-5ced-437f-bf9b-a79b857c3980%2Frosie-fraser-1L71sPT5XKc-unsplash.jpg?v=1578327157678");
  background-repeat: no-repeat;
  background-size: auto;
}
</style>
