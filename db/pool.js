const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'valenscarpentier',
    password: 'a2s8zzqr',
    database: 'book_inventory',
    port: 5432
  });

module.exports = pool;