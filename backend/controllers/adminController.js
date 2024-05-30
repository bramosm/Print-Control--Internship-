const Admin = require('../models/Adminmodel')
const mongoose = require('mongoose')

//GET all Admins
const getAdmins = async (req, res) => {
    const Admins = await Admin.find({}).sort({createdAt: -1})

    res.status(200).json(admins)
}

//GET a single Admin
const getAdmin = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Admin id'})
    }

    const admin = await Admin.findById(id)

    if (!admin){
        return res.status(400).json({error: 'no such Admin'})
    }

    res.status(200).json(admin)
}


//POST a new Admin
const createAdmin = async (req, res) => {
    const {nombreDocumento, nombreUsuario, nombreImpresora, fechaImpresion, cantidadHojas} = req.body

    // add Admin to db
    try {
        const admin = await Admin.create({nombreDocumento, nombreUsuario, nombreImpresora, 
            fechaImpresion, cantidadHojas})
        res.status(200).json(admin)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELELE a Admin
const deleteAdmin = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Admin id'})
    }
    const admin = await Admin.findOneAndDelete({_id: id})

    if (!Admin){
        return res.status(400).json({error: 'no such Admin'})
    }

    res.status(200).json(admin)
}

module.exports ={
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin
}