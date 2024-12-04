const mysql = require('mysql');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Saran@123',
  database: 'ECommerceDBC',
  connectionLimit: 10,
});


module.exports = pool;
