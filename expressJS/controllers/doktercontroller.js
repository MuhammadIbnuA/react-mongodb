const Dokter = require('../models/doktermodel');

// Create a new dokter
const createDokter = async (req, res) => {
  try {
    const { nama, spesialisasi, alamat } = req.body;
    const dokter = new Dokter({ nama, spesialisasi, alamat });
    await dokter.save();
    res.send('Dokter created successfully');
  } catch (error) {
    console.error('Error creating dokter:', error);
    res.status(500).send('Error creating dokter');
  }
};

// Get a dokter by ID
const getDokterById = async (req, res) => {
  try {
    const dokterId = req.params.id;
    const dokter = await Dokter.findById(dokterId);
    if (!dokter) {
      res.status(404).send('Dokter not found');
    } else {
      res.json(dokter);
    }
  } catch (error) {
    console.error('Error fetching dokter:', error);
    res.status(500).send('Error fetching dokter');
  }
};

// Get all dokters
const getAllDokters = async (req, res) => {
  try {
    const dokters = await Dokter.find();
    res.json(dokters);
  } catch (error) {
    console.error('Error fetching dokters:', error);
    res.status(500).send('Error fetching dokters');
  }
};

// Update a dokter by ID
const updateDokter = async (req, res) => {
  try {
    const dokterId = req.params.id;
    const updateData = req.body;
    const updatedDokter = await Dokter.findByIdAndUpdate(dokterId, updateData, { new: true });
    if (!updatedDokter) {
      res.status(404).send('Dokter not found');
    } else {
      res.json(updatedDokter);
    }
  } catch (error) {
    console.error('Error updating dokter:', error);
    res.status(500).send('Error updating dokter');
  }
};

// Delete a dokter by ID
const deleteDokter = async (req, res) => {
  try {
    const dokterId = req.params.id;
    const deletedDokter = await Dokter.findByIdAndDelete(dokterId);
    if (!deletedDokter) {
      res.status(404).send('Dokter not found');
    } else {
      res.send('Dokter deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting dokter:', error);
    res.status(500).send('Error deleting dokter');
  }
};

module.exports = {
  createDokter,
  getDokterById,
  getAllDokters,
  updateDokter,
  deleteDokter
};
