require('dotenv').config();

const {
  DB_USER = 'root',
  DB_PASS = 'password',
  DB_NAME = 'vehicle_rental_db',
  DB_HOST = '127.0.0.1',
  DB_DIALECT = 'mysql'
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    dialect: DB_DIALECT
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT
  }
};
