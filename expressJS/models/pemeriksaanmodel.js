const mongoose = require('mongoose');

const pemeriksaanSchema = new mongoose.Schema({
  medicalRecordNo: {
    type: String,
    required: true
  },
  dokterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dokter',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  obatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Obat'
  },
  pasienId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pasien',
    required: true
  }
});

const Pemeriksaan = mongoose.model('Pemeriksaan', pemeriksaanSchema);

module.exports = Pemeriksaan;
