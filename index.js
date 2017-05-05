var express = require("express");
var bodyParser = require('body-parser');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var servidor = 'mongodb://localhost:27017/auvo';

var app = express();


//Middleware para extraer los parametros
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//******************* PILOTOS ********************************************//

//Retorna todos los pilotos
app.get('/pilotos', function(req, res) {
    console.log("req a wsPilotos");
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
        assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('piloto').find({}).toArray(function(err, docs) {
            res.send({"desc": docs});
            db.close();
        });
        
    });
});

//Retorna piloto
app.get('/piloto/:_id', function(req, res) {
 var o_id = new ObjectId(req.params._id);
 console.log("req a ws Piloto: " + o_id);  
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
    assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('piloto').find({"_id":o_id}).toArray(function(err, docs) {
            res.send(docs);
            db.close();
        });
    });
});



//******************* CIRCUITOS ********************************************//



//Retorna todos los ciruitos
app.get('/circuitos', function(req, res) {
    console.log("req a wsCircuitos");
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
        assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('circuito').find({}).toArray(function(err, docs) {
            res.send({"desc": docs});
            db.close();
        });        
    });

});

//Retorna circuito
app.get('/circuito/:_id', function(req, res) {
 var o_id = new ObjectId(req.params._id);
 console.log("req a wsCircuito: " + o_id);  
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
    assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('circuito').find({"_id":o_id}).toArray(function(err, docs) {
            res.send(docs);
            db.close();
        });
    });
});


//******************* EVENTOS ********************************************//

//Retorna todos los eventos
app.get('/eventos', function(req, res) {
    console.log("req a wsEvento");
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
        assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('evento').find({}).sort({"nFecha":1}).toArray(function(err, docs) {
            res.send({"desc": docs});
            db.close();
        });
        
    }); 
});


//Retorna evento
app.get('/evento/:_id', function(req, res) {
 var o_id = new ObjectId(req.params._id);
 console.log("req a wsevento: " + o_id);  
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
    assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('evento').find({"_id":o_id}).toArray(function(err, docs) {
            res.send(docs);
            db.close();
        });
    });
});



//******************* ACTIVIDADES ********************************************//

//Retorna actividad
app.get('/actividad/:_id', function(req, res) {
 var o_id = new ObjectId(req.params._id);
 console.log("req a wsactividad: " + o_id);  
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
    assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('actividad').find({"_id":o_id}).toArray(function(err, docs) {
            res.send(docs);
            db.close();
        });
    });
});


//******************* CAMPEONATO ********************************************//

//Retorna campeonato
app.get('/campeonato', function(req, res) {
    console.log("req a wsCampeonato");
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
        assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('campeonato').find({}).toArray(function(err, docs) {

            res.send({"desc": docs});
            db.close();
        });
        
    });
});


//Retorna campeonato
app.get('/carrera/:_id', function(req, res) {
    var o_id = req.params._id;
    console.log("req a ws carrera");
    /* Voy a buscar al servidor Mongo*/
    MongoClient.connect(servidor, function(err, db) {
        assert.equal(err, null, 'Error al conectarse a Mongo');
        db.collection('carrera').find({"notificacion":o_id}).toArray(function(err, docs) {
            res.send({"desc": docs});
            db.close();
        });
        
    });
});



//Contenido estático en la carpeta public
app.use(express.static('public'));

//Descomentar para rutas amigables sin # ni #!
app.use('/*', function(req, res) {

    res.sendFile('public/index.html', { root: __dirname });
});
app.listen(8080, function() { console.log("Corriendo en puerto 8080"); });
