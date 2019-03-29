var ObjectID = require('mongodb').ObjectID
var MongoClient = require('mongodb').MongoClient
var config = require('../config');
var express = require('express');
var router = express.Router();

// RENDER HOME
router.get('/', async (req, res, next) => {
  MongoClient.connect(await config.mongoUrl, function( err, db ){
    db.collection('fulanos').find({}).toArray(function( err, data){
      res.render('index', { title: 'Usuarios cadastrados', data:data});      
        // console.log('pegou os dados', data);
    })
  })
});

module.exports = router;
