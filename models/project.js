'use strict'

// entidad del proyecto representa a una entidad de la base de datos

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	name: String,
	description: String,
	category: String,
	langs: String,
	year: Number,
	image: String
});

//se usa en singular por que el modulo lo pasa a plural y asi guardar en projects la coleccion
//projects -> guarda los documentos en la coleccion
module.exports = mongoose.model('Project', ProjectSchema);
