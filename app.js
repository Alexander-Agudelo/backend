'use strict'


// llamo los modulos express y body parse para poder trabajar con ellos
var express = require('express');
var bodyParser = require('body-parser');

//ejecuto el modulo express
var app = express();

// cargar archivos de rutas
var project_routes = require('./routes/project');

// middlewares - convertir todo lo que llega en formato JSON
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// RUTAS
app.use('/api',project_routes);

// exportar -> se exporta el modulo app que es la que tiene toda la configuracion de los middlewares para poder usarlo en index.js y asi generar el servidor 
module.exports = app;