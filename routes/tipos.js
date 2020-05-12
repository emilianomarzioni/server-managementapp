const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');
const auth = require('../middleware/auth');
const {check} =require('express-validator');

//Create proyects api/proyectos
router.post('/',
    auth,
    [check("titulo","Ingrese titulo de tipo").not().isEmpty()],
    [check("tipo","missing tipo").not().isEmpty()],  
    tipoController.crearTipo
);
router.get('/',
    auth,
    tipoController.obtenerTipos
);

module.exports = router;