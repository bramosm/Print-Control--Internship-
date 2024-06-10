const Server = require('../models/servermodel')
const mongoose = require('mongoose')

//GET all Servers
const getServers = async (req, res) => {
    const servers = await Server.find({}).sort({createdAt: -1})

    res.status(200).json(servers)
}

//GET an single Server
const getServer = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Server id'})
    }

    const server = await Server.findById(id)

    if (!Server){
        return res.status(400).json({error: 'no such Server'})
    }

    res.status(200).json(server)
}


//POST an new Server
const createServer = async (req, res) => {
    const {nombreServidor, maquinaAnfitriona, direccionesIP, dominio} = req.body

    // add Server to db
    try {
        const server = await Server.create({nombreServidor, maquinaAnfitriona, direccionesIP, dominio})
        res.status(200).json(server)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE an Server
const deleteServer = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Server id'})
    }
    const server = await Server.findOneAndDelete({_id: id})

    if (!Server){
        return res.status(400).json({error: 'no such Server'})
    }

    res.status(200).json(Server)
}

// PATCH an Server
const updateServer = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Server id'})
    }

    const server = await Server.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!Server){
        return res.status(400).json({error: 'no such Server'})
    }

    res.status(200).json(server)
}




module.exports ={
    createServer,
    getServers,
    getServer,
    deleteServer,
    updateServer
}