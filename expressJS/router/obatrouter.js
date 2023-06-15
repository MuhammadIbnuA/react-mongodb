const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obatcontroller');

// Create a new obat
router.post('/obats', obatController.createObat);

// Get an obat by ID
router.get('/obats/:id', obatController.getObatById);

// Get all obats
router.get('/obats', obatController.getAllObats);

// Update an obat
router.put('/obats/:id', obatController.updateObat);

// Delete an obat
router.delete('/obats/:id', obatController.deleteObat);

module.exports = router;
