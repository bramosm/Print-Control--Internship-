const express = require('express')
const { 
    createServer,
    getServer,
    getServers,
    deleteServer
 } = require('../controllers/serverController')

const router = express.Router()

// GET all Servers
router.get('/', getServers)

// GET a single Server
router.get('/:id', getServer)

// POST a new Server
router.post('/', createServer)

// DELETE a Server
router.delete('/:id', deleteServer)

module.exports = router