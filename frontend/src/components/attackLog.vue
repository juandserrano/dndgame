<template name="attack-log">
    <div class="container">
        <ul>
            <li v-for="(log, index) in attackLog" :key="index" :class="{redBck: log.type == 'monsterAttack', blueBck: log.type == 'playerAttack', goldenBck: log.type == 'playerSpecialAttack', greenBck: log.type == 'playerHeals'}">
                {{ log.text }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ["attackLog"],
  data: () => {
    return {
           maxLogs: 10
    };
  },
  watch: {
    attackLog: function(){
      if(this.attackLog.length > 10){this.attackLog.splice(10,1)}
    }
  }
};
</script>

<style scoped>


.container {
  /* border: 1px black solid; */
  /* width: 80%; */
  /* height: 400px; */
  padding: 0;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    opacity: 0.8;
}

.blueBck {
  background-color: rgb(149, 149, 255);
}

.redBck {
  background-color: rgb(255, 145, 145);
}

.greenBck {
  background-color: rgb(180, 255, 180);
}

.goldenBck {
  background-color: rgb(255, 240, 153);
  border: 2px dotted rgb(177, 150, 0);
}

li {
  text-align: center;
  margin-bottom: 2px;
  border: 1px solid black
}

</style>