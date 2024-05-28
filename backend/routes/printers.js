const express = require('express')

const router = express.Router()

// GET all printers
router.get('/', (req, res) => {
    res.json({mssg: 'GET all printers'})
})

// GET a single printer
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single printer'})
})

// POST a new printer
router.post('/', (req, res) => {
    res.json({mssg:'POST a new printer'})
})

// DELETE a printer
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a printer'})
})

module.exports = router