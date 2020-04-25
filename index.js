'use strict'

var mongoose = require('mongoose');

// llamo a app que tiene toda la config de express y meddlewares se encuentra en  app.js
var app = require('./app');

//puerto de mi servidor
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
		.then(() => {
				console.log('Conexion exitosa a DB. Hola mundo DB');

				// Creación del servidor
				app.listen(port, () => {
					console.log('servicios corriendo correctamente en la url: localhost:3700');
				});

		})
		.catch(err => console.log(err));