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
    impresionquincenaImpresora: {
        type: Number,
        required: false
    },
    impresionesImpresora:{
        type: Object,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Printer', PrinterSchema)