const mongoose = require('mongoose')

const TipoSchema = mongoose.Schema({
    titulo:{
        type: String,
        required: true,
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
    }
});
module.exports = mongoose.model('Tipo', TipoSchema);