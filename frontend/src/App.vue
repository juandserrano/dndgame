<template>
  <div>
    <Status :playMaxHP='player.maxHP'
    :playCurrHP='player.currHP'
    :monMaxHP='monster.hit_points'
    :monCurrHP='monCurrHP'
    :playerName='player.name'
    :monsterName='monster.name'
    class="status"
    />
    <div>
      <button @click='attack'>attack</button>
      <button @click='specialAttack' v-if="player.activeSpecial">Special Attack</button>
      <button @click='heal' v-if="player.activeHeal">Heal</button>
    </div>
  </div>
</template>

<script>
import Status from './components/Status';
import allMonstersArray from './assets/allMonsters'

export default {
  components: {Status},
  data: () => {
    return {
      player: {
        currHP: Number,
        maxHP: Number,
        level: Number,
        name: 'Juan',
        countToHeal: 0,
        activeSpecial: false,
        activeHeal: false
      },
      monster: {},
      monCurrHP: Number,
      allMonsters: []
  }
  },
  methods: {
    attack(){
      this.monCurrHP -= this.damage(this.player.minDamage,this.player.maxDamage);
      if(this.winLose()){return};
      setTimeout(this.monsterAttack,1000);
    },
    specialAttack(){
      this.monCurrHP -= this.damage(0 ,this.player.maxDamage + 20);
      this.player.activeSpecial = false;
      if(this.winLose()){return};
      setTimeout(this.monsterAttack,500);
    },
    monsterAttack(){
      this.player.currHP -= this.damage(this.monster.minDamage, this.monster.maxDamage);
      if(this.player.countToHeal > 0) {this.player.countToHeal -= 1};
      if(this.winLose()){return};
      if(Math.random()<0.2){this.player.activeSpecial = !this.player.activeSpecial}
    },
    damage(min, max){
      let damage = Math.max((Math.floor(Math.random()*max)+1),min);
      return damage;
    },
    heal(){
      this.player.currHP += Math.max((Math.floor(Math.random()*7)+1),2);
      this.player.countToHeal = 4;
      setTimeout(this.monsterAttack,500);
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

      //RESET PLAYER
      this.player.activeSpecial = false;
      this.player.activeHeal = false;
      this.player.countToHeal = 0;
      this.player.maxHP = 150;
      this.player.currHP = this.player.maxHP;
      
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
  }

}
</script>

<style>
  .status {
    margin-top: 30px
  }
</style>
