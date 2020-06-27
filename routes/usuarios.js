//Routes to create Users
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator')
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Agrega un email válido').isEmail(),
    check('password','El password debe ser minimo de 6 caracteres').isLength({min:6}),
    check('moneda_base','Falta moneda Base').not().isEmpty(),
    check('debito_a','debito_a missing').not().isEmpty(),
    check('debito_b','debito_b missing').not().isEmpty()
],
usuarioController.crearUsuario
)
module.exports = router;