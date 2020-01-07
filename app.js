const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const ImageSearchAPIClient = require('azure-cognitiveservices-imagesearch');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;

require('dotenv').config();

//replace this value with your valid subscription key.
let serviceKey = "4264f8ac6bca410a83e3cc13dffc0f12";

//instantiate the image search client 
let credentials = new CognitiveServicesCredentials(serviceKey);
let imageSearchApiClient = new ImageSearchAPIClient(credentials);




const dbconfig = require('./mongoConfig');
const serverport = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(serverport,()=>console.log('Backend server running on ' + serverport));

app.use(express.static('./frontend'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html')
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
    const sendQuery = async () => {
    return await imageSearchApiClient.imagesOperations.search(randMonster[0].name + ' dungeons and dragons');
    };
    
    sendQuery().then(imageResults => {
      if (imageResults == null) {
      console.log("No image results were found.");
      }
      else {
          let firstImageResult = imageResults.value[0];
          //display the details for the first image result. After running the application,
          //you can copy the resulting URLs from the console into your browser to view the image.
          //console.log(`First image content url: ${firstImageResult.contentUrl}`);
          res.status(200).send({
          monster: randMonster[0],
          portraitUrl: firstImageResult.thumbnailUrl
          });
      }
    })
    .catch(err => {
      res.status(200).send({
        monster: randMonster[0],
        portraitUrl: ""
        });
        console.error(err);
    })

    
});

  /////////////CODIGO PARA SUBIR A ATLAS////////////////////////
//mArray = require('../frontend/src/assets/allMonsters.js');
// 

// mArray.forEach((mon) => {
//     const monster = new Monster (mon);
//     monster.save((err, obj) => {console.log(obj.name + 'saved to DB')});
// });

//////////////////////////////////////////////////////////////