const Admin = require('../models/Adminmodel')
const mongoose = require('mongoose')

//GET all Admins
const getAdmins = async (req, res) => {
    const admins = await Admin.find({}).sort({createdAt: -1})

    res.status(200).json(admins)
}

//GET an single Admin
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


//POST an new Admin
const createAdmin = async (req, res) => {
    const {nombreAdmin, passAdmin, emailAdmin} = req.body

    // add Admin to db
    try {
        const admin = await Admin.create({nombreAdmin, passAdmin, emailAdmin})
        res.status(200).json(admin)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE an Admin
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

// PATCH an Admin
const updateAdmin = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Admin id'})
    }

    const admin = await Admin.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!Admin){
        return res.status(400).json({error: 'no such Admin'})
    }

    res.status(200).json(admin)
}




module.exports ={
    createAdmin,
    getAdmins,
    getAdmin,
    deleteAdmin,
    updateAdmin
}