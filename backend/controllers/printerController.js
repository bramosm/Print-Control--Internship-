const Printer = require('../models/printermodel')
const mongoose = require('mongoose')

//GET all Printers
const getPrinters = async (req, res) => {
    const printers = await Printer.find({}).sort({createdAt: -1})

    res.status(200).json(printers)
}

//GET an single Printer
const getPrinter = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Printer id'})
    }

    const printer = await Printer.findById(id)

    if (!Printer){
        return res.status(400).json({error: 'no such Printer'})
    }

    res.status(200).json(printer)
}


//POST an new Printer
const createPrinter = async (req, res) => {
    const {nombreImpresora, ipImpresora, totalPaginasImpresasIm, promedioPaginasPorTrabajoIm} = req.body

    // add Printer to db
    try {
        const printer = await Printer.create({nombreImpresora, ipImpresora, totalPaginasImpresasIm,promedioPaginasPorTrabajoIm})
        res.status(200).json(printer)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE an Printer
const deletePrinter = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Printer id'})
    }
    const printer = await Printer.findOneAndDelete({_id: id})

    if (!Printer){
        return res.status(400).json({error: 'no such Printer'})
    }

    res.status(200).json(printer)
}

// PATCH an Printer
const updatePrinter = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Printer id'})
    }

    const printer = await Printer.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!Printer){
        return res.status(400).json({error: 'no such Printer'})
    }

    res.status(200).json(printer)
}




module.exports ={
    createPrinter,
    getPrinters,
    getPrinter,
    deletePrinter,
    updatePrinter
}