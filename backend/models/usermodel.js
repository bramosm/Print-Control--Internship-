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
        required: false
    },
    promedioPaginasPorTrabajo:{
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)