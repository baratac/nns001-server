'use strict';
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");

const fs = require('fs')

const campaignModel = require('./models/campaignModel')

// Load Data Function
//
async function loadData(filename) {
  try {
    const rawData = fs.readFileSync(filename)
    const cpgData = JSON.parse(rawData)
    
    // Clear the collection to reload data
    await campaignModel.deleteMany({})

    // Upload all records from data file
    let cpgItem = undefined;
    cpgData.forEach(async (item, index) => {
        cpgItem = new campaignModel(item);
        try {
          await cpgItem.save();
          // console.log(`Item ${index}: OK`);
        }
        catch (error) {
          console.log('Save Item Failed with error:', error.errmsg);
        } 
    });
  }
  catch (err) {
    console.log('ERROR: Load Data File Failed');
  }
}

// Restart DB data if reference is passed on command line
// 
if (process.argv.length > 2) {
  console.log('Restarting Data')
  loadData(process.argv[2])
}

// ----------------------------------------
// console.log("GOING TO CONNECT to MONGOURI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err))

// ----------------------------------------

const app = express();
app.use(cors());

app.get('/', async function (req, res) {
  // console.log('Request Received');
  try {
    res.send(await campaignModel.find({}));
  }
  catch (error) {
    console.log('Database Access Error:', error.errmsg);
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})