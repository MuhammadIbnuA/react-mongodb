const express = require('express');
const router = express.Router();
const pemeriksaanController = require('../controllers/pemeriksaancontroller');



// Routes for the Pemeriksaan model
router.post('/pemeriksaans', pemeriksaanController.createPemeriksaan);
router.get('/pemeriksaans', pemeriksaanController.getAllPemeriksaan);
router.get('/pemeriksaans:id', pemeriksaanController.getPemeriksaanById);
router.put('/pemeriksaans:id', pemeriksaanController.updatePemeriksaan);
router.delete('/pemeriksaans:id', pemeriksaanController.deletePemeriksaan);

module.exports = router;
