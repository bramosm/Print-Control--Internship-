const express = require('express')

const router = express.Router()

// GET all prints
router.get('/', (req, res) => {
    res.json({mssg: 'GET all prints'})
})

// GET a single print
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single print'})
})

// POST a new print
router.post('/', (req, res) => {
    res.json({mssg:'POST a new print'})
})

// DELETE a print
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a print'})
})

module.exports = router