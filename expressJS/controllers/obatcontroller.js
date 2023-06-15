const Obat = require('../models/obatmodel');

const obatController = {
  createObat: async (req, res) => {
    try {
      const { namaObat } = req.body;
      const obat = new Obat({ namaObat });
      await obat.save();
      res.send('Obat created successfully');
    } catch (error) {
      console.error('Error creating obat:', error);
      res.status(500).send('Error creating obat');
    }
  },

  getObatById: async (req, res) => {
    try {
      const obatId = req.params.id;
      const obat = await Obat.findById(obatId);
      if (!obat) {
        res.status(404).send('Obat not found');
      } else {
        res.json(obat);
      }
    } catch (error) {
      console.error('Error fetching obat:', error);
      res.status(500).send('Error fetching obat');
    }
  },

  getAllObats: async (req, res) => {
    try {
      const obats = await Obat.find();
      res.json(obats);
    } catch (error) {
      console.error('Error fetching obats:', error);
      res.status(500).send('Error fetching obats');
    }
  },

  updateObat: async (req, res) => {
    try {
      const obatId = req.params.id;
      const updateData = req.body;
      const updatedObat = await Obat.findByIdAndUpdate(obatId, updateData, { new: true });
      if (!updatedObat) {
        res.status(404).send('Obat not found');
      } else {
        res.json(updatedObat);
      }
    } catch (error) {
      console.error('Error updating obat:', error);
      res.status(500).send('Error updating obat');
    }
  },

  deleteObat: async (req, res) => {
    try {
      const obatId = req.params.id;
      const deletedObat = await Obat.findByIdAndDelete(obatId);
      if (!deletedObat) {
        res.status(404).send('Obat not found');
      } else {
        res.send('Obat deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting obat:', error);
      res.status(500).send('Error deleting obat');
    }
  },
};

module.exports = obatController;
