const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: true
    },
    emailUsuario: {
        type: String,
        required: true
    },
    impresionescontador:{
        type: Number,
        required: false
    },
    impresiones:{
        type: Object,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)