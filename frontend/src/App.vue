<template>
  <div>
    <Status :playMaxHP='player.maxHP'
    :playCurrHP='player.currHP'
    :monMaxHP='monster.hit_points'
    :monCurrHP='monCurrHP'
    :playerName='player.name'
    :monsterName='monster.name'
    :gameResetting='gameResetting'
    class="status"
    />
    <div class="actionbar text-center" v-if="!turnInProgress">
      <button class='attack' @click='attack'>Attack</button>
      <button class='special' @click='specialAttack' v-if="player.activeSpecial">Special Attack</button>
      <button class='heal' @click='heal' v-if="player.activeHeal">Heal</button>
    </div>
    <div class="actionbar transparentactionbar text-center" v-else>
      <button>Attack</button>
      <button v-if="player.activeSpecial">Special Attack</button>
      <button v-if="player.activeHeal">Heal</button>
    </div>
    <Log v-if="attackLog.length > 0"
    :attackLog="attackLog"/>
  </div>
</template>

<script>
import Status from './components/Status';
import Log from './components/attackLog'
import allMonstersArray from './assets/allMonsters'


export default {
  components: {Status, Log},
  data: () => {
    return {
      player: {
        currHP: Number,
        maxHP: Number,
        level: Number,
        name: String,
        countToHeal: 0,
        activeSpecial: false,
        activeHeal: false
      },
      monster: {},
      monCurrHP: Number,
      allMonsters: [],
      attackLog: [],
      lastPoint: Number,
      turnInProgress: false,
      gameResetting: false
  }
  },
  methods: {
    attack(){
      this.turnInProgress = true;
      this.lastPoint = this.damage(this.player.minDamage,this.player.maxDamage);
      this.monCurrHP -= this.lastPoint;
      this.attackLog.unshift({
        text: `${this.player.name} attacks ${this.monster.name} for ${this.lastPoint} HP`,
        type: 'playerAttack'
      })

      if(this.winLose()){return};
      setTimeout(this.monsterAttack,500);
      setTimeout(() => this.turnInProgress = false, 500);
    },
    specialAttack(){
      this.turnInProgress = true;
      this.lastPoint = this.damage(this.player.minDamage,this.player.maxDamage) + 20;
      this.monCurrHP -= this.lastPoint;
      this.attackLog.unshift({
        text: `${this.player.name} deals a powerfull blow to ${this.monster.name} for ${this.lastPoint} HP`,
        type: 'playerSpecialAttack'
      })
      this.player.activeSpecial = false;
      if(this.winLose()){return};
      setTimeout(this.monsterAttack,500);
      setTimeout(() => this.turnInProgress = false, 500);
    },
    monsterAttack(){
      this.lastPoint = this.damage(this.monster.minDamage,this.monster.maxDamage);
      this.player.currHP -= this.lastPoint
      this.attackLog.unshift({
        text: `${this.monster.name} attacks ${this.player.name} for ${this.lastPoint} HP`,
        type: 'monsterAttack'
      })
      if(this.player.countToHeal > 0) {this.player.countToHeal -= 1};
      if(this.winLose()){return};
      if(Math.random()<0.2){this.player.activeSpecial = !this.player.activeSpecial}
    },
    damage(min, max){
      let damage = Math.max((Math.floor(Math.random()*max)+1),min);
      return damage;
    },
    heal(){
      this.turnInProgress = true;
      this.lastPoint = Math.max((Math.floor(Math.random()*7)+1),2);
      this.player.currHP += this.lastPoint
      this.attackLog.unshift({
        text: `${this.player.name} heals for ${this.lastPoint} HP`,
        type: 'playerHeals'
      })
      this.player.countToHeal = 4;
      setTimeout(this.monsterAttack,500);
      setTimeout(() => this.turnInProgress = false, 500);
      if(this.winLose()){return};
    },
    winLose(){
      if(this.player.currHP < 1){
        alert('You Lose...');
        this.resetGame();
        return true;
      }else if (this.monCurrHP < 1){
        alert('You Win!');
        this.resetGame();
        return true
      } else {return false}
    },
    resetGame(){
      //SET UP RANDOM MONSTER
      this.monster = this.randomMonster();
      this.monCurrHP = this.monster.hit_points;
      this.gameResetting = !this.gameResetting;
      
      //RESET PLAYER & LOG
      this.player.activeSpecial = false;
      this.player.activeHeal = false;
      this.player.countToHeal = 0;
      this.player.maxHP = 150;
      this.player.currHP = this.player.maxHP;
      this.attackLog = [];
      this.turnInProgress = false;
      
      //////////**TODO: NEED TO ASSING DINAMICALLY 
      this.monster.minDamage = 5;
      this.monster.maxDamage = 15;
      this.player.minDamage = 5;
      this.player.maxDamage = 10;
      //////////////////////////
    },
    randomMonster(){
      let monIndex = Math.floor(Math.random()*this.allMonsters.length);
      return this.allMonsters[monIndex];
      
    },
    randomDice(sides){
      return Math.floor(Math.random()*(sides+1));
    }
  },
  watch: {
    //CHECK TO SEE IF HEALING IS AVAILABLE TO THE PLAYER
    'player.currHP': function (){
      if (this.player.currHP < this.player.maxHP && this.player.countToHeal == 0){
        this.player.activeHeal = true;
        }else{
          this.player.activeHeal = false;
        }
    }
  },
  mounted() {
    //IMPORT MONSTERS FROM JS FILE
    this.allMonsters = allMonstersArray;
        
    //START NEW GAME
    this.resetGame();    
    this.player.name = prompt('Welcome!\nPlease enter your adventurers name:','Sexyman');
  }

}
</script>

<style>
  .status {
    margin-top: 30px
  }

  .transparentactionbar {
    opacity: 0.4;
  }

  .actionbar {
    /* border: 1px solid black; */
    padding: 20px;
  }

  .attack {
    box-shadow: 0px 0px 5px rgb(0, 60, 255);
    border: 1px solid rgb(0, 81, 255);
    background-color: rgb(167, 198, 255)
  }

  .special {
    box-shadow: 0px 0px 5px rgb(255, 218, 6);
    border: 1px solid rgb(255, 166, 0);
    background-color: rgb(255, 244, 148)
  }

  .heal {
    box-shadow: 0px 0px 5px rgb(30, 255, 0);
    border: 1px solid rgb(0, 187, 0);
    background-color: rgb(157, 255, 161)
  }
</style>
