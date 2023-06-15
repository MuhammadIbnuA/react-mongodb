const Pasien = require('../models/pasienmodel');

// Create a new pasien
async function createPasien(req, res) {
  try {
    const { nama, umur, jenisKelamin } = req.body;
    const pasien = new Pasien({ nama, umur, jenisKelamin });
    await pasien.save();
    res.send('Pasien created successfully');
  } catch (error) {
    console.error('Error creating pasien:', error);
    res.status(500).send('Error creating pasien');
  }
}

// Get a pasien by ID
async function getPasienById(req, res) {
  try {
    const pasienId = req.params.id;
    const pasien = await Pasien.findById(pasienId);
    if (!pasien) {
      res.status(404).send('Pasien not found');
    } else {
      res.json(pasien);
    }
  } catch (error) {
    console.error('Error fetching pasien:', error);
    res.status(500).send('Error fetching pasien');
  }
}

// Get all pasiens
async function getAllPasiens(req, res) {
  try {
    const pasiens = await Pasien.find();
    res.json(pasiens);
  } catch (error) {
    console.error('Error fetching pasiens:', error);
    res.status(500).send('Error fetching pasiens');
  }
}

// Update a pasien by ID
async function updatePasien(req, res) {
  try {
    const pasienId = req.params.id;
    const updateData = req.body;
    const updatedPasien = await Pasien.findByIdAndUpdate(pasienId, updateData, { new: true });
    if (!updatedPasien) {
      res.status(404).send('Pasien not found');
    } else {
      res.json(updatedPasien);
    }
  } catch (error) {
    console.error('Error updating pasien:', error);
    res.status(500).send('Error updating pasien');
  }
}

// Delete a pasien by ID
async function deletePasien(req, res) {
  try {
    const pasienId = req.params.id;
    const deletedPasien = await Pasien.findByIdAndDelete(pasienId);
    if (!deletedPasien) {
      res.status(404).send('Pasien not found');
    } else {
      res.send('Pasien deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting pasien:', error);
    res.status(500).send('Error deleting pasien');
  }
}

module.exports = {
  createPasien,
  getPasienById,
  getAllPasiens,
  updatePasien,
  deletePasien
};
