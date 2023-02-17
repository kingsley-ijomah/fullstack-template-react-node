const { Pool } = require('pg');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

// set up the common pool config
const poolConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

// create a pool for each environment
const pools = {
  development: new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    ...poolConfig, // spread operator
  }),
  test: new Pool({
    user: process.env.TEST_DB_USER,
    database: process.env.TEST_DB_NAME,
    password: process.env.TEST_DB_PASSWORD,
    ...poolConfig, // spread operator
  }),
};

// // development or test
// const pool = pools[process.env.NODE_ENV]; 

// pool.on('connect', () => {
//   console.log('Database connected successfully!');
// });

const getPool = (environment) => {
  return pools[environment || process.env.NODE_ENV || 'development'];
};

const query = (text, params, environment) => {
  const pool = getPool(environment);

  return pool.query(text, params);
};

module.exports = {
  query,
};

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
