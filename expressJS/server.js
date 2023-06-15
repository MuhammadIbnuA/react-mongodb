const express = require('express');
const app = express();
const pool = require('./db');
const PORT = 3001;
const cors = require('cors');
const crypto = require('crypto');
// const { v4: uuidv4 } = require('uuid');


app.use(express.json());
app.use(cors());

// Define your API endpoints here
app.get('/test', (req, res) => {
    pool.query('SELECT * FROM dokter1', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });


app.get('/test/:dokterId', (req, res) => {
    const dokterId = req.params.dokterId;
    pool.query(`SELECT * FROM dokter1 WHERE dokter_id = ${dokterId}`, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

app.post('/test', (req, res) => {
    const { nama, spesialisasi, alamat } = req.body;
    pool.query(
        `INSERT INTO dokter1 (nama, spesialisasi, alamat) VALUES ('${nama}', '${spesialisasi}', '${alamat}')`,
    //   [nama, spesialisasi, alamat],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Dokter added successfully' });
        }
      }
    );
  });
  
  app.put('/test/:dokterId', (req, res) => {
    const dokterId = req.params.dokterId;
    const { nama, spesialisasi, alamat } = req.body;
    pool.query(
      `UPDATE dokter1 SET nama = "${nama}", spesialisasi = "${spesialisasi}", alamat = "${alamat}" WHERE dokter_id = ${dokterId}`,
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Dokter updated successfully' });
        }
      }
    );
  });
  
app.delete('/test/:dokterId', (req, res) => {
    const dokterId = req.params.dokterId;
    pool.query(
        `DELETE FROM dokter1 WHERE dokter_id = ${dokterId}`,
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Dokter deleted successfully' });
        }
      }
    );
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get('/pasien', (req, res) => {
    pool.query('SELECT * FROM pasien', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.post('/pasien', (req, res) => {
    const { nama, umur, jenis_kelamin } = req.body;
    pool.query(
        `INSERT INTO pasien (nama, umur, jenis_kelamin) VALUES ('${nama}', '${umur}', '${jenis_kelamin}')`,
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Dokter added successfully' });
        }
      }
    );
  });


    app.delete('/pasien/:pasien_id', (req, res) => {
        const pasien_id = req.params.pasien_id;
        pool.query(
            `DELETE FROM pasien WHERE pasien_id = ${pasien_id}`,
          (error) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal Server Error' });
            } else {
              res.status(200).json({ message: 'Dokter deleted successfully' });
            }
          }
        );
      });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get('/pemeriksaan', (req, res) => {
    pool.query('SELECT * FROM pemeriksaan', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.post('/pemeriksaan', (req, res) => {
    const { dokter_id, date, time, obat_id, pasien_id } = req.body;
    const medicalrecordNO = generateRandomNumber(10); // Generate a 10-digit random number
  
    pool.query(
      `INSERT INTO pemeriksaan (medicalrecordNO, dokter_id, date, time, obat_id, pasien_id) VALUES ('${medicalrecordNO}', '${dokter_id}', '${date}', '${time}', '${obat_id}', '${pasien_id}')`,
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json(results);
        }
      }
    );
  });
  
  function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const randomNumber = Math.floor(
      crypto.randomInt(min, max + 1)
    );
    return randomNumber.toString().padStart(digits, '0');
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get('/obat', (req, res) => {
    pool.query('SELECT * FROM obat_id', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get('/searchobat/:medicalrecordNO', (req, res) => {
    const medicalrecordNO = req.params.medicalrecordNO;
  
    const query = 
    ` SELECT o.nama_obat
      FROM pemeriksaan p
      JOIN obat_id o ON p.obat_id = o.obat_id
      WHERE p.medicalrecordNO = '${medicalrecordNO}'
    `;
  
    pool.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  

  /////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
