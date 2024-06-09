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
        required: true
    },
    promedioPaginasPorTrabajoIm:{
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Printer', PrinterSchema)