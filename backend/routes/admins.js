const express = require('express')

const router = express.Router()

// GET all admins
router.get('/', (req, res) => {
    res.json({mssg: 'GET all admins'})
})

// GET a single admin
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single admin'})
})

// POST a new admin
router.post('/', (req, res) => {
    res.json({mssg:'POST a new admin'})
})

// DELETE a admin
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a admin'})
})

// PATCH an admin

module.exports = router