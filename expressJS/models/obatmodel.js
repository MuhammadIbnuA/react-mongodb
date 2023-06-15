const mongoose = require('mongoose');

const obatSchema = new mongoose.Schema({
  namaObat: {
    type: String,
    required: true,
  },
});

const Obat = mongoose.model('Obat', obatSchema);

module.exports = Obat;
