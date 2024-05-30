const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    nombreAdmin: {
        type: String,
        required: true
    },
    passAdmin: {
        type: String,
        required: true
    },
    emailAdmin:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Admin', adminSchema)