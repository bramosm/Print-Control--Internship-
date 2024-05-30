const express = require('express')
const { 
    createPrint,
    getPrint,
    getPrints,
    deletePrint
 } = require('../controllers/printController')

const router = express.Router()

// GET all prints
router.get('/', getPrints)

// GET a single print
router.get('/:id', getPrint)

// POST a new print
router.post('/', createPrint)

// DELETE a print
router.delete('/:id', deletePrint)

module.exports = router