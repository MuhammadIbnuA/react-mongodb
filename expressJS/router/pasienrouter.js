const express = require('express');
const router = express.Router();
const {
  createPasien,
  getPasienById,
  getAllPasiens,
  updatePasien,
  deletePasien
} = require('../controllers/pasiencontroller');
const isAuthenticated = require('../middleware/authmiddleware')

// Create a new pasien
router.post('/pasiens',isAuthenticated, createPasien);

// Get a pasien by ID
router.get('/pasiens/:id',isAuthenticated, getPasienById);

// Get all pasiens
router.get('/pasiens',isAuthenticated, getAllPasiens);

// Update a pasien by ID
router.put('/pasiens/:id',isAuthenticated, updatePasien);

// Delete a pasien by ID
router.delete('/pasiens/:id',isAuthenticated, deletePasien);

module.exports = router;
