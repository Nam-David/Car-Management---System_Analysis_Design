const { Pool } = require('pg');

const pool = new Pool ({
  user: 'postgres',
  host: 'localhost', 
  database: 'Car_Agency_Management',
  password: '9804',
  port: 5432
});



/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'car-management',
    password: 'admin',
    port: 5432, // Cổng mặc định của PostgreSQL
}); */

/*
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost', 
    database: 'postgres',
    password: 'Dung2811',
    port: 5432
});
*/




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





/* //query testing connection
(async () => {
    try {
      const client = await pool.connect();
  
  
      // Sample query to test functionality (replace with your desired query)
      const result = await client.query('SELECT * FROM dataAGENCY');
      
      console.log('Query result:', result.rows[0]); // Access the result
  
      await client.release();
    } catch (error) {
      console.error('Error connecting to database:', error);
    } 
  })() */




