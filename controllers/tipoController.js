
const Tipo = require('../models/Tipo');
const {validationResult} = require('express-validator');
exports.crearTipo = async ( req,res) => {
    //Check for errors
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
        res.status(500).send("Hubo un error en la creación del Tipo");

    }
    try{
        const tipo = new Tipo(req.body);
        tipo.usuario = req.usuario.id;
        
        tipo.save();
        res.json(tipo);
    }catch (error){
        console.log(error);
        res.status(500).send("Hubo un error en la creación del Tipo");
    }
}

exports.obtenerTipos = async (req,res) =>{
    try{
        const tipos = await Tipo.find({usuario:req.usuario.id});
        res.json({tipos});
    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un error");
    }

}
