const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PrinterSchema = new Schema({
    nombreImpresora: {
        type: String,
        required: true
    },
    ipImpresora: {
        type: String,
        required: true
    },
    impresionquincenaimpresora: {
        type: Number,
        required: false
    },
    impresionesImpresora:{
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Printer', PrinterSchema)