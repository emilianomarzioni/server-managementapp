const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimientoController');
const auth = require('../middleware/auth');
const {check} =require('express-validator');

//Create proyects api/proyectos
router.post('/',
    auth,
    [check("detalle","Ingrese detalle de movimiento").not().isEmpty()],
    [check("tipo","missing tipo").not().isEmpty()],
    [check("monto","missing monto")],
    [check("modo","missing modo").not().isEmpty()],
    [check("moneda","missing moneda").not().isEmpty()],
    movimientoController.crearMovimiento
);
router.get('/',
    auth,
    movimientoController.obtenerMovimientos
);
router.put('/:id',
    auth,
    [check("detalle","Ingrese detalle de movimiento").not().isEmpty()],
    [check("tipo","missing tipo").not().isEmpty()],
    [check("monto","missing monto")],
    [check("modo","missing modo").not().isEmpty()],
    [check("moneda","missing moneda").not().isEmpty()],
    movimientoController.actualizarMovimiento
);
router.delete('/:id',
    auth,
    movimientoController.eliminarMovimiento
);
module.exports = router;