// utils/db.js
import mysql from 'mysql2';

// Create a connection to MySQL using Railway environment variables
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,       // Railway MySQL host
  user: process.env.MYSQLUSER,       // Railway MySQL username
  password: process.env.MYSQLPASSWORD, // Railway MySQL password
  database: process.env.MYSQLDATABASE, // Railway MySQL database name
  port: process.env.MYSQLPORT        // Railway MySQL port (usually 3306)
});

export default db;
