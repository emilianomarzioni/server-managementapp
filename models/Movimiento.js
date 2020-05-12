const mongoose = require('mongoose')

const MovimientoSchema = mongoose.Schema({
    detalle:{
        type: String,
        required: true,
        trim:true
    },
    monto:{
        type:Number
    },
    modo:{
        type:String,
        required: true,
        trim:true
    },
    moneda:{
        type:String,
        required:true,
        trim:true
    },
    tipo:{
        type:String,
        required:true,
        trim:true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    fecha: {
        type:String,
        trim:true
    }
});
module.exports = mongoose.model('Movimiento', MovimientoSchema);