<template>
  <div class="container">
    <div class="row">
      <div class="col playercol">
        <div>
          <img class='portrait mx-auto d-block rounded' src="https://images.unsplash.com/photo-1548412576-d92cb3275e23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80" width="200" height="200">
          <h3>{{ playerName }}</h3>
          <div class="fondo">
            <span class="health" :style="{ width: (playCurrHP/playMaxHP) * 300  + 'px' }">{{ playCurrHP }}</span>
          </div>
        </div>
      </div>
      <div class="col">
        <div>
          <img class='portrait mx-auto d-block rounded' src="https://images.unsplash.com/photo-1548412576-d92cb3275e23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80" width="200" height="200">
          <h3>{{ monsterName }}</h3>
          <div class="fondo">
            <span class="health monred" :style="{ width: (monCurrHP/monMaxHP) * 300 + 'px' }">{{ monCurrHP }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playCurrHP", "playMaxHP", "monMaxHP", 'playerName', 'monsterName', 'monCurrHP'],
  data: () => {
    return {
      
    };
  }
};
</script>

<style scoped>


.container {
  border: 1px black solid;
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
</style>
