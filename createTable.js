import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

const createTableSQL = `
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  contact VARCHAR(50),
  image VARCHAR(255),
  email_id VARCHAR(255)
);
`;

db.query(createTableSQL, (err, result) => {
  if (err) console.error('Error creating table:', err);
  else console.log('Table "schools" created successfully!');
  db.end();
});
