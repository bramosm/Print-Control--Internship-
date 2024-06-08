const User = require('../models/usermodel')
const mongoose = require('mongoose')

//GET all Users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

//GET an single User
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such User id'})
    }

    const user = await User.findById(id)

    if (!User){
        return res.status(400).json({error: 'no such User'})
    }

    res.status(200).json(user)
}


//POST an new User
const createUser = async (req, res) => {
    const {nombreUsuario, emailUsuario, impresionesporquincena, impresiones} = req.body

    // add User to db
    try {
        const user = await User.create({nombreUsuario, emailUsuario, impresionesporquincena, impresiones})
        res.status(200).json(user)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE an User
const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such User id'})
    }
    const user = await User.findOneAndDelete({_id: id})

    if (!User){
        return res.status(400).json({error: 'no such User'})
    }

    res.status(200).json(user)
}

// PATCH an User
const updateUser = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such User id'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!User){
        return res.status(400).json({error: 'no such User'})
    }

    res.status(200).json(user)
}




module.exports ={
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}