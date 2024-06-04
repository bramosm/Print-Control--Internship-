const mongoose = require('mongoose')

const Schema = mongoose.Schema

const printSchema = new Schema({
    nombreDocumento: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true
    },
    nombreCliente: {
        type: String,
        required: true
    },
    nombreImpresora: {
        type: String,
        required: true
    },
    fechaImpresion: {
        type: String,
        required: true
    },
    cantidadHojas:{
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Print', printSchema)