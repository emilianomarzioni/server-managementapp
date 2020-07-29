const express = require('express');
const router = express.Router();
const creditoController = require('../controllers/creditoController');

//Create proyects api/proyectos

router.get('/',
    creditoController.obtenerCreditos
);
 router.put('/',
    
    creditoController.actualizarCredito
); 

module.exports = router;