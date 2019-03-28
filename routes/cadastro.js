var ObjectID = require('mongodb').ObjectID
var MongoClient = require('mongodb').MongoClient
var config = require('../config');
var express = require('express');
var router = express.Router();

// RENDER DA PAGINA
router.get('/', function(req, res, next) {
  res.render('cadastro', { title: 'Cadastro'});
  });


// RENDER EDIT
router.get('/cadastro/edit', function(req, res, next) {
  res.render('edit', { title: 'Edite'});
  });

// CRUD:

  // CREATE
  router.post('/add', function(req, res, next) {
    
    var objeto = {nome:req.body.nome,idade:req.body.idade};
    
    MongoClient.connect(config.mongoUrl, function( err, db ){    
      db.collection('fulanos').insert(objeto, function(err, result){
        if(err) return console.log('Erro ao inserir no BD', err);
        console.log('Inserido com Sucesso!', result);
    
        res.redirect('/');
      });
    })
  });

  // READ
  router.get('/edit/:id', function(req, res, next) {
    
    var id = ObjectID(req.params.id);
    
    MongoClient.connect(config.mongoUrl, function( err, db ){
      db.collection('fulanos').find({_id:id}).toArray(function( err, data){
        res.render('edit', {title:'edite seu cadastro', petecas:data});      
      })
    })
  });

  // UPDATE
  router.post('/update', function(req, res, next) {
      
      var objeto = {nome:req.body.nome,idade:req.body.idade};
      var id = ObjectID(req.body.id);
      
      MongoClient.connect(config.mongoUrl, function( err, db ){
        db.collection('fulanos').update({_id:id},(objeto), function(err, result){
          if(err) return console.log('Erro ao fazer o Update', err);
          console.log('Editado com Sucesso!', result);
          res.redirect('/');
        });
      })
  });

  // DELETE
  router.get('/delete/:id', function(req, res, next) {
        
        var objeto = {nome:req.body.nome,idade:req.body.idade};
        var id = ObjectID(req.params.id);
        
        MongoClient.connect(config.mongoUrl, function( err, db ){
          db.collection('fulanos').remove({_id:id}, function(err, result){
            if(err) return console.log('Erro ao remover',err);
            console.log('Removido com Sucesso!', result);
            res.redirect('/');
          });
        })
   });

module.exports = router;
