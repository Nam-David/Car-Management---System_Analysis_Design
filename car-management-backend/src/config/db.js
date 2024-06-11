const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'car_management',
    password: '08112018',
    port: 5432, // Cổng mặc định của PostgreSQL
});

module.exports = pool;