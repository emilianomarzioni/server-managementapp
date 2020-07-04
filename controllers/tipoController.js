
const Tipo = require('../models/Tipo');
const {validationResult} = require('express-validator');
exports.crearTipo = async ( req,res) => {
    //Check for errors
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
        res.status(500).send("Hubo un error en la creación del Tipo");

    }
    const { titulo} = req.body;

    try{
        let tipo = await Tipo.findOne({titulo,usuario:req.usuario.id});
    if(tipo){
        return res.status(400).json({msg: ' el tipo ya existe'});
    }
        tipo = new Tipo(req.body);
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
exports.eliminarTipo = async (req, res ) => {
    try {
        // check the ID 
        let tipo = await Tipo.findById(req.params.id);

        // valid movement?
        if(!tipo) {
            return res.status(404).json({msg: 'Tipo no encontrado'})
        }

        // valid creator?
        if(tipo.usuario.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // delete
        await Tipo.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Movimiento eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}
