const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'car-management',
    password: 'admin',
    port: 5432, // Cổng mặc định của PostgreSQL
});

module.exports = pool;