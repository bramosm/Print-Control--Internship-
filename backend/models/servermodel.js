const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serverSchema = new Schema({
    nombreServidor: {
        type: String,
        required: true
    },
    maquinaAnfitriona: {
        type: String,
        required: true
    },
    direccionesIP: {
        type: String,
        required: true
    },
    dominio: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Server', serverSchema)