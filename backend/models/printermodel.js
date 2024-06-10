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
    totalPaginasImpresasIm: {
        type: Number,
        required: false
    },
    promedioPaginasPorTrabajoIm:{
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Printer', PrinterSchema)