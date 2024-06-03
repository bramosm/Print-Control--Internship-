const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    nombreUser: {
        type: String,
        required: true
    },
    emailUser: {
        type: String,
        required: true
    },
    impresionesporquincena:{
        type: Number,
        required: false
    },
    impresiones:{
        type: Object,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)