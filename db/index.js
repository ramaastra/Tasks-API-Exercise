const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'api_exercise',
  user: process.env.DB_USERNAME,
  password: process.env.DB_USER_PASSWORD,
  port: 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
