const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const dbconfig = require('./mongoConfig');
const serverport = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(serverport,()=>console.log('Backend server running on ' + serverport));

app.use(express.static('../frontend'));
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

mongoose
  .connect(dbconfig.mongoURI, dbconfig.mongoCFG)
  .then(() => {
    console.log('Connected to DB...');
  })
  .catch(error => console.log(JSON.stringify(error)));
  
const monSchema = new mongoose.Schema({},{strict: false});
const Monster = mongoose.model("monster", monSchema);

app.get('/api/', async (req, res) =>{
    const randMonster = await Monster.aggregate([{ $sample: { size: 1 } }]);
    console.log(`Sending random monster to frontend: ${randMonster[0].name}`);
    res.status(200).send(randMonster[0]);
});

  /////////////CODIGO PARA SUBIR A ATLAS////////////////////////
//mArray = require('../frontend/src/assets/allMonsters.js');
// 

// mArray.forEach((mon) => {
//     const monster = new Monster (mon);
//     monster.save((err, obj) => {console.log(obj.name + 'saved to DB')});
// });

//////////////////////////////////////////////////////////////