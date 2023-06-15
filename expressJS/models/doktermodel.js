const mongoose = require('mongoose');

// Define the Dokter schema
const dokterSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  spesialisasi: {
    type: String,
    required: true
  },
  alamat: {
    type: String,
    required: true
  }
});

// Create the Dokter model based on the schema
const Dokter = mongoose.model('Dokter', dokterSchema);

module.exports = Dokter;
