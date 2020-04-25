'use strict'

// Cargo expres para poder crear mis propias rutas con express
// y traigo a mi controlador se encuentra en controllers / project.js para poder utilizarlo todo 

var express = require('express');
var ProjectController = require('../controllers/project');

// cargo el router de express
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);


//exporto mi modulo 'router' para poder usarlo en cualquier otro lado
module.exports = router;