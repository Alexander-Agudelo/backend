'use strict'

var Project = require('../models/project'); // disponible mi modelo para hacer instancia de el el numero de veces necesarias
var fs = require('fs'); // llamo a la libreria filesystem para poder borrar un archivo de mi base de dato o un unlink en la linea 138
var path = require('path'); // modulo de NodeJS para poder cargar rutas fisicas de nuestro servidor

var controller = {

	home: function(req, res){
		return res.status(200).send({
			message: 'Home'
		});
	},
	test: function(req, res){
		return res.status(200).send({
			message: 'Soy metodo test del controlador project'
		});

	},

	// Metodo para guardar un nuevo proyecto en base de datos
	saveProject: function(req, res){
		var project = new Project(); // creo un objeto de proyecto

		var params = req.body; // doy valores al nuevo objeto que me acaba de llegar

		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.langs = params.langs;
		project.year = params.year;
		project.image = null;

		project.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento'});

			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar proyecto'});

			return res.status(200).send({
				project: projectStored   // --> Guarda en la base de datos mi nuevo proyecto
			}); 
		});

	},

	//Metodo para devolver un proyecto que solicitamos por la url

	getProject: function(req, res){
		var projectId = req.params.id; // recogemos el valor id que llega por la url de la ruta 

		if (projectId == null ) return res.status(404).send({message: 'El proyecto no existe.'}); // en mi ruta puse el parametro id opcional por eso tengo que hacer esta respuesta

		Project.findById(projectId, (err, project) => { // con el findByid buscamos un objeto en la base de datos con el id

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!project) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				project
			});
		});
	},

	// metodo para enlistar todos los proyectos que tengo en mi base de datos

	getProjects: function(req, res){

		Project.find({}).exec((err, projects) =>{

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!projects) return res.status(404).send({message: 'No hay proyectos que mostrar.'});

			return res.status(200).send({
				projects
			});

		});
	},


	// metodo para actulizar mi proyecto de la base de datos

	updateProject: function(req, res){
		var projectId = req.params.id; // recogemos el valor id que llega por la url de la ruta 
		var update = req.body; // recoger todo el body de la peticion, es el objeto completo con los datos ya actualizados de mi proyecto

		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar.'});

			if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				project: projectUpdated
			});
		});
	},

	// metodo para eliminar un proyecto

	deleteProject: function(req, res){
		var projectId = req.params.id; // recogemos el valor id que llega por la url de la ruta del proyecto que vamos a eliminar

		Project.findByIdAndDelete(projectId, (err, projectRemoved) =>{
			if(err) return res.status(500).send({message: 'Error al borrar el proyecto.'});

			if(!projectRemoved) return res.status(404).send({message: 'No se puede eliminar ese proyecto.'});

			return res.status(200).send({
				project: projectRemoved
			});
		});
	},

	uploadImage: function(req, res){
		var projectId = req.params.id; // recogemos el valor id que llega por la url de la ruta 
		var fileName = 'imagen no subida...';

		if(req.files){ // con el Connect-Multyparty recogemos ficheros por la url, por que por default esto no existe en Node.js
			var filePath = req.files.image.path; // obtengo la informacion total de mi imagen que se ha guardado en el disco duro
			var fileSplit = filePath.split('\\'); // obtengo el nombre real del archivo que se ha guardado en el disco duro si es windows '\\' en linux '/'
			var fileName = fileSplit[1]; //recojo el indice del archivo que es el nombre del archivo
			var extSplit = fileName.split('\.'); // obtengo la extension de mi archivo
			var fileExt = extSplit[1]; //de mi array de dos elemento tomo el indice numero 1 para poder obtener la extension

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){ // verifico que mi archivo sea de estas extensiones
				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) =>{
					if(err) return res.status(500).send({message: 'La imagen no se ha subido.'});
					
					if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe.'});

					return res.status(200).send({
						project: projectUpdated
					});
				});
			}else{
				fs.unlink(filePath, (err) => {  //  uso libreria file system para borrar la imagen
					return res.status(200).send({message: 'La imagen no es valida'});
				});
			}

			

			
		}else{
			return res.status(200).send({
				message:fileName
			});
		}
	},


	getImageFile: function(req, res){
		var file = req.params.image;   			//obtenemos el nombre del archivo que pasare por la url como parametro de la ruta
		var path_file = './uploads/'+file;		// ruta de la imagen 

		fs.exists(path_file, (exists) => {
			if (exists) {
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({message: 'No existe la imagen'})
			}
		});
	}
};

module.exports = controller;