const Print = require('../models/printmodel')
const mongoose = require('mongoose')

//GET all prints
const getPrints = async (req, res) => {
    const prints = await Print.find({}).sort({createdAt: -1})

    res.status(200).json(prints)
}

//GET a single print
const getPrint = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such print id'})
    }

    const print = await Print.findById(id)

    if (!print){
        return res.status(400).json({error: 'no such print'})
    }

    res.status(200).json(print)
}


//POST a new print
const createPrint = async (req, res) => {
    const {nombreDocumento, nombreUsuario, nombreCliente, nombreImpresora, fechaImpresion, cantidadHojas} = req.body

    // add print to db
    try {
        const print = await Print.create({nombreDocumento, nombreUsuario, nombreCliente, nombreImpresora, 
            fechaImpresion, cantidadHojas})
        res.status(200).json(print)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELELE a print
const deletePrint = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such print id'})
    }
    const print = await Print.findOneAndDelete({_id: id})

    if (!print){
        return res.status(400).json({error: 'no such print'})
    }

    res.status(200).json(print)
}

module.exports ={
    createPrint,
    getPrints,
    getPrint,
    deletePrint
}