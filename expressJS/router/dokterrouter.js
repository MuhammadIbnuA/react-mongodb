const express = require('express');
const router = express.Router();
const {
  createDokter,
  getDokterById,
  getAllDokters,
  updateDokter,
  deleteDokter
} = require('../controllers/doktercontroller');

const isAuthenticated = require('../middleware/authmiddleware')

// Create a new dokter
router.post('/dokters',isAuthenticated, createDokter);

// Get a dokter by ID
router.get('/dokters/:id',isAuthenticated, getDokterById);

// Get all dokters
router.get('/dokters',isAuthenticated, getAllDokters);

// Update a dokter by ID
router.put('/dokters/:id',isAuthenticated, updateDokter);

// Delete a dokter by ID
router.delete('/dokters/:id',isAuthenticated, deleteDokter);

module.exports = router;
