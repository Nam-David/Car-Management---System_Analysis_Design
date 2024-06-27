const dotenv = require('dotenv');
dotenv.config(); // Đọc file .env

const { Pool } = require('pg');

// Sử dụng biến môi trường trong cấu hình Pool
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

// check db connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Crash Database:', err);
  } else {
    console.log('Database Connected!', res.rows[0]);
  }
}
);

// return "pool" in Object format to be used in other files - return a "pool" instance
module.exports = { pool };