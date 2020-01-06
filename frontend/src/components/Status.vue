<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col playercol">
        <div>
          <img class='portrait mx-auto d-block rounded' :src="playerPortrait" width='300'>
          <h3>{{ playerName }}</h3>
          <div class="fondo">
            <span class="health" :style="{ width: (playCurrHP/playMaxHP) * 300  + 'px' }">{{ playCurrHP }}</span>
          </div>
        </div>
        <div class="stats">
          <table>
            <tr><td><strong>CON</strong></td><td>{{ playerCON }}</td></tr>
            <tr><td>Attack modifier</td><td>{{ playerMod }}</td></tr>
            <tr><td>Weapon</td><td>{{ capitalize(equipedWeapon) }}</td></tr>
          </table>
        </div>
      </div>
      <div class="col">
        <div>
          <img class='portrait mx-auto d-block rounded' :src="monsterPortrait" width="300">
          <h3>{{ monsterName }}</h3>
          <div class="fondo">
            <span class="health monred" :style="{ width: (monCurrHP/monMaxHP) * 300 + 'px' }">{{ monCurrHP }}</span>
          </div>
        </div>
        <div class="stats">
          <table>
            <tr><td><strong>CON</strong></td><td>{{ monsterCON }}</td></tr>
            <tr><td>Attack modifier</td><td>{{ monsterMod }}</td></tr>              
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import portraitUrl from '../assets/allPortraits'

export default {
  props: ["playCurrHP", "playMaxHP", "monMaxHP", 'playerName', 'monsterName', 'monCurrHP', 'gameResetting', 'playerCON', 'playerMod', 'monsterMod', 'monsterCON', 'equipedWeapon'],
  data: () => {
    return {
      playerPortrait: String,
      monsterPortrait: String
    };
  },
  methods: {
    capitalize: function (string){
      const capString = string.charAt(0).toUpperCase() + string.slice(1)
      return capString;
    }
  },
  watch: {
    gameResetting: function () {
      this.monsterPortrait = portraitUrl.randomPortraitMonster();      
    }
  },
  mounted(){
    this.playerPortrait = portraitUrl.randomPortraitPlayer();
    this.monsterPortrait = portraitUrl.randomPortraitMonster();
  }
};






</script>

<style scoped>


.container {
  border: 1px black solid;
  box-shadow: 5px 5px 5px grey;
}

h3 {
  text-align: center;
  margin-top: 10px;
}
.bar {
  margin: 0 auto;
}
.fondo {
    width: 300px;
    height: 40px;
    background-color: lightgray;
    box-shadow: 1px 1px 2px black;
    padding: 0;
    margin: 0px auto 20px auto;

}

.health {
    height: 40px;
    background-color: rgb(0, 108, 175);
    box-shadow: 1px 1px 2px black;
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 2;
    color: azure;
    text-align: center;
    line-height: 40px
}

.portrait {
  margin-top: 20px;
}

.playercol {
  border-right: 1px solid black
}

.monred{
  background-color: brown
}

table {
  margin: 0px auto 20px auto;
}

th, td {
  margin: 0 auto;
  border-collapse: collapse;
  border: 3px solid gray;
}

td {
  width: 100px
}
.stats {
  margin: 0 auto;
  text-align: center;
}
</style>
