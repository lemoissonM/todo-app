require('dotenv').config();

const {
  DB_NAME,
  DB_HOST,
  DB_USERNAME,
  DB_PORT,
  DB_PASSWORD,
  DB_UL
} = process.env

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql'
  },
  test: {
    url: DB_UL,
    dialect: 'mysql'
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql'
  }
}

