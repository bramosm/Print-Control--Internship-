const express = require('express')
const { 
    createPrinter,
    getPrinter,
    getPrinters,
    deletePrinter
 } = require('../controllers/printerController')

const router = express.Router()

// GET all Printers
router.get('/', getPrinters)

// GET a single Printer
router.get('/:id', getPrinter)

// POST a new Printer
router.post('/', createPrinter)

// DELETE a Printer
router.delete('/:id', deletePrinter)

module.exports = router