// Import MySQL2
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',  // MySQL server address
  user: 'root',  // MySQL username
  password: 'Saran@123',  // MySQL password
  database: 'pos_db',  // Your database name
  waitForConnections: true,
  connectionLimit: 10,  // Max number of connections in pool
  queueLimit: 0
});

// Promisify the pool.query method for async/await
const promisePool = pool.promise();

// Export the pool for use in other modules
module.exports = promisePool;
