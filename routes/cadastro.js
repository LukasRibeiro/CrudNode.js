const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const config = require('../config');
const express = require('express');
const router = express.Router();
const exec =  require('../erro');

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
  router.post('/add', async (req, res, next) => {
    
    let objeto = {nome:req.body.nome,idade:req.body.idade};
    
    MongoClient.connect(await config.mongoUrl, function( err, db ){    
      db.collection('fulanos').insert(objeto, function(err, result){
        if(err){
          return console.log('Erro ao inserir no BD', err);
        }
        else{
          console.log('Inserido com Sucesso!', result);
        }
        res.redirect('/');
      });
    })
  });


  // READ
  router.get('/edit/:id', async (req, res, next) => {
    
    let id = ObjectID(req.params.id);
    
    MongoClient.connect(await config.mongoUrl, function( err, db ){
      db.collection('fulanos').find({_id:id}).toArray(function( err, data){
        res.render('edit', {title:'edite seu cadastro', petecas:data});      
      })
    })
  });


  // UPDATE
  router.post('/update', async (req, res, next) => {
      
      let objeto = {nome:req.body.nome,idade:req.body.idade};
      let id = ObjectID(req.body.id);
      
      MongoClient.connect(await config.mongoUrl, function( err, db ){
        db.collection('fulanos').update({_id:id},(objeto), function(err, result){
          if(err){
          return console.log('Erro ao fazer o Update', err);
        }
        else{
          console.log('Editado com Sucesso!', result);
        }
          res.redirect('/');
        });
      })
  });


  // DELETE
  router.get('/delete/:id', async (req, res, next) => {
    
    let objeto = {nome:req.body.nome,idade:req.body.idade};
    let id = ObjectID(req.params.id);
    
    MongoClient.connect(await config.mongoUrl, function( err, db ){
      db.collection('fulanos').remove({_id:id}, function(err, result){
      if(err){
        return console.log('Erro ao remover',err);
      }
      else{
        console.log('Removido com Sucesso!', result);
      }
      res.redirect('/');
      });
    });
  });

module.exports = router;