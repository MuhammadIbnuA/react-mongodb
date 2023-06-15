const mongoose = require('mongoose');

const pasienSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  umur: {
    type: Number,
    required: true
  },
  jenisKelamin: {
    type: String,
    // enum: ['Laki-laki', 'Perempuan'],
    required: true
  }
});

const Pasien = mongoose.model('Pasien', pasienSchema);

module.exports = Pasien;
