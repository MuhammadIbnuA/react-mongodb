// db.js
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sql-react',
  connectionLimit: 10, // adjust according to your needs
});

module.exports = pool;
