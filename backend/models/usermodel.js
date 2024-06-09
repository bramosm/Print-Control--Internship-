const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    nombreDadoU: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true
    },
    emailUsuario: {
        type: String,
        required: true
    },
    totalPaginasImpresas:{
        type: Number,
        required: true
    },
    promedioPaginasPorTrabajo:{
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)