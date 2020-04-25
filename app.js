'use strict'


// llamo los modulos express y body parse para poder trabajar con ellos
var express = require('express');
var bodyParser = require('body-parser');

//ejecuto el modulo express
var app = express();

// cargar archivos de rutas, el que se encuentra en la carpeta de routes y accedo a project.js
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


// RUTAS -> es un middleware cargo el archivo de rutas que se declaro en la linea 12 para que la cargue sobre app
// para poder acceder a alguna ruta localhost:3700/api/<route> la rutas que tengo declarada en mi archivo project.js de carpeta routes
app.use('/api',project_routes);

// exportar -> se exporta el modulo app que es la que tiene toda la configuracion de los middlewares para poder usarlo en index.js y asi generar el servidor 
module.exports = app;