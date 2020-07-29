const mongoose = require('mongoose')

const CreditoSchema = mongoose.Schema({
    TNA:{
        type: Number,
        required: true
    },
    TEM:{
        type:Number,
        required:true,
    },
    CFTEA:{
        type: Number,
    },
    CFTNA:{
        type:Number
    },
    mutualID:{
        type:Number
    }
});
module.exports = mongoose.model('Credito', CreditoSchema);