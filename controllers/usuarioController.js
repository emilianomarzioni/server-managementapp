const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req,res) => {
    //Check for errors

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    //Take email and password from request
    const { email, password} = req.body;

try{
    let usuario = await Usuario.findOne({email});
    if(usuario){
        return res.status(400).json({msg: ' el usuario ya existe'});
    }
    //Create user
    usuario = new Usuario(req.body);
    
    //Hashear the password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password,salt)

    await usuario.save();
    //Create and save the JW
    const payload = {
        usuario:{
            id:usuario.id
        }
    }
    jwt.sign(payload,process.env.SECRETA,{
        expiresIn:3600
    },(error,token) => {
        if(error)throw error;

        //Success msj
        res.json({token});
    })

    res.json({msg: 'Usuario creado correctamente',user:req.body});
} catch(error){
    console.log(error);
    console.log("Error desde usuarioController")
    res.status(400).send('Error en el registro')
}


}
exports.agregarCuenta = async ( req,res) => {
    /* //Check for errors
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    
    //Extract info from mov
    const { titulo,moneda} = req.body;
    const nuevacuenta = {name:titulo,moneda:moneda};

    if(titulo && monto && moneda && tipo && fecha && modo ){
        nuevacuenta.detalle = detalle;
        nuevacuenta.monto = monto;
        nuevacuenta.moneda = moneda;
        nuevacuenta.tipo = tipo;
        nuevacuenta.fecha = fecha;
        nuevacuenta.modo = modo;
    }
    try{
            //check the ID
            let usuario = await Usuario.findById(req.params.id);

            if(!usuario){
                return res.status(404).send("Usuario no encontrado")
            }
            //If mov exist
            if(movimiento.usuario.toString() !== req.usuario.id){
                return res.status(401).json({msg:"No autorizado"});
            }
            //If is creator true
            movimiento = await Movimiento.findByIdAndUpdate({_id:req.params.id},{$set:nuevacuenta},{new: true});

            res.json({movimiento});
    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un error");
    } */
}