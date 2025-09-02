import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config(); // Optional on Railway, but fine to keep

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.error('MySQL Connection Failed:', err);
  } else {
    console.log('Connected to MySQL successfully!');
  }
});

export default db;
