
const Movimiento = require('../models/Movimiento');
const {validationResult} = require('express-validator');
exports.crearMovimiento = async ( req,res) => {
    //Check for errors
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    try{
        const movimiento = new Movimiento(req.body);
        movimiento.usuario = req.usuario.id;
        movimiento.save();
        res.json(movimiento);
    }catch (error){
        console.log(error);
        res.status(500).send("Hubo un error en la creación del movimiento");
    }
}

exports.obtenerMovimientos = async (req,res) =>{
    try{
        const movimientos = await Movimiento.find({usuario:req.usuario.id});
        res.json({movimientos});
    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}
exports.actualizarMovimiento = async ( req,res) => {
    //Check for errors
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    
    //Extract info from mov
    const { detalle ,monto,moneda,tipo,fecha,modo} = req.body
    const newMove = {};

    if(detalle && monto && moneda && tipo && fecha && modo ){
        newMove.detalle = detalle;
        newMove.monto = monto;
        newMove.moneda = moneda;
        newMove.tipo = tipo;
        newMove.fecha = fecha;
        newMove.modo = modo;
    }
    try{
            //check the ID
            let movimiento = await Movimiento.findById(req.params.id);

            if(!movimiento){
                return res.status(404).send("Movimiento no encontrado")
            }
            //If mov exist
            if(movimiento.usuario.toString() !== req.usuario.id){
                return res.status(401).json({msg:"No autorizado"});
            }
            //If is creator true
            movimiento = await Movimiento.findByIdAndUpdate({_id:req.params.id},{$set:newMove},{new: true});

            res.json({movimiento});
    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}
exports.eliminarMovimiento = async (req, res ) => {
    try {
        // check the ID 
        let movimiento = await Movimiento.findById(req.params.id);

        // valid movement?
        if(!movimiento) {
            return res.status(404).json({msg: 'Movimiento no encontrado'})
        }

        // valid creator?
        if(movimiento.usuario.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // delete
        await Movimiento.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Movimiento eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}
