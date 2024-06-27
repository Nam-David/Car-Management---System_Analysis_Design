const { Pool } = require('pg');

/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'car-management',
    password: 'admin',
    port: 5432, // Cổng mặc định của PostgreSQL
}); */

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost', 
    database: 'Car_Agency_Management',
    password: '9804',
    port: 5432
})

// check db connection
pool.query('SELECT NOW()', (err, res) => 
  {
    if (err) {
        console.error('Crash Database:', err);
    } else {
        console.log('Database Connected!', res.rows[0]);
    }
  }
);

// return "pool" in Object format to be used in other files - return a "pool" instance
module.exports = {pool};