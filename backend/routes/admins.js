const express = require('express')
const { 
    createAdmin,
    getAdmin,
    getAdmins,
    deleteAdmin,
    updateAdmin
 } = require('../controllers/adminController')

const router = express.Router()

// GET all Admins
router.get('/', getAdmins)

// GET a single Admin
router.get('/:id', getAdmin)

// POST a new Admin
router.post('/', createAdmin)

// DELETE a Admin
router.delete('/:id', deleteAdmin)

// DELETE a Admin
router.patch('/:id', updateAdmin)

module.exports = router