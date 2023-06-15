const Pemeriksaan = require('../models/pemeriksaanmodel');

// Controller actions for the Pemeriksaan model
const pemeriksaanController = {
  // ...

  createPemeriksaan: async (req, res) => {
    try {
      const { medicalRecordNo, dokterId, date, time, pasienId } = req.body;
  
      const pemeriksaan = new Pemeriksaan({
        medicalRecordNo,
        dokterId,
        date,
        time,
        pasienId
      });
  
      await pemeriksaan.save();
      
      // Extract necessary properties from populated objects
      const { dokterId: dokter, pasienId: pasien, ...pemeriksaanData } = pemeriksaan._doc;
      
      res.json({
        ...pemeriksaanData,
        dokterId: dokter.nama,
        pasienId: pasien.nama,
        obatId: obatId.namaObat
      });
    } catch (error) {
      console.error('Error creating pemeriksaan:', error);
      res.status(500).send('Error creating pemeriksaan');
    }
  },
  
  getPemeriksaanById: async (req, res) => {
    try {
      const pemeriksaanId = req.params.id;
      const pemeriksaan = await Pemeriksaan.findById(pemeriksaanId)
        .populate('dokterId', 'nama')
        .populate('pasienId', 'nama')
        .populate('obatId','namaObat');
  
      if (!pemeriksaan) {
        res.status(404).send('Pemeriksaan not found');
      } else {
        const { dokterId, pasienId, obatId, ...pemeriksaanData } = pemeriksaan._doc;
        const obatName = obatId ? obatId.namaObat : null;
        res.json({
          ...pemeriksaanData,
          dokterId: dokterId.nama,
          pasienId: pasienId.nama,
          obatId: obatName
        });
      }
    } catch (error) {
      console.error('Error fetching pemeriksaan:', error);
      res.status(500).send('Error fetching pemeriksaan');
    }
  },
  
  getAllPemeriksaan: async (req, res) => {
    try {
      const pemeriksaans = await Pemeriksaan.find()
        .populate('dokterId', 'nama')
        .populate('pasienId', 'nama')
        .populate('obatId','namaObat');
  
      const formattedPemeriksaans = pemeriksaans.map(pemeriksaan => {
        const { dokterId, pasienId, obatId, ...pemeriksaanData } = pemeriksaan._doc;
        const obatName = obatId ? obatId.namaObat : null;
        return {
          ...pemeriksaanData,
          dokterId: dokterId.nama,
          pasienId: pasienId.nama,
          obatId: obatName
        };
      });
  
      res.json(formattedPemeriksaans);
    } catch (error) {
      console.error('Error fetching pemeriksaans:', error);
      res.status(500).send('Error fetching pemeriksaans');
    }
  },

  updatePemeriksaan: async (req, res) => {
    try {
      const pemeriksaanId = req.params.id;
      const updateData = req.body;
      const updatedPemeriksaan = await Pemeriksaan.findByIdAndUpdate(pemeriksaanId, updateData, { new: true })
        .populate('dokterId', 'nama')
        .populate('pasienId', 'nama')
        .populate('obatId','namaObat');

      if (!updatedPemeriksaan) {
        res.status(404).send('Pemeriksaan not found');
      } else {
        const { dokterId, pasienId, obatId, ...pemeriksaanData } = updatedPemeriksaan._doc;
        res.json({
          ...pemeriksaanData,
          dokterId: dokterId.nama,
          pasienId: pasienId.nama,
          obatId: obatId.namaObat
        });
      }
    } catch (error) {
      console.error('Error updating pemeriksaan:', error);
      res.status(500).send('Error updating pemeriksaan');
    }
  },

  deletePemeriksaan: async (req, res) => {
    try {
      const pemeriksaanId = req.params.id;
      const deletedPemeriksaan = await Pemeriksaan.findByIdAndDelete(pemeriksaanId)
        .populate('dokterId', 'nama')
        .populate('pasienId', 'nama')
        .populate('obatId','namaObat');

      if (!deletedPemeriksaan) {
        res.status(404).send('Pemeriksaan not found');
      } else {
        const { dokterId, pasienId, obatId, ...pemeriksaanData } = deletedPemeriksaan._doc;
        res.json({
          ...pemeriksaanData,
          dokterId: dokterId.nama,
          pasienId: pasienId.nama,
          obatId: obatId.namaObat
        });
      }
    } catch (error) {
      console.error('Error deleting pemeriksaan:', error);
      res.status(500).send('Error deleting pemeriksaan');
    }
  }
};

module.exports = pemeriksaanController;
