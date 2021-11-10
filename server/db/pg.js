const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_USER,
    password: process.env.DB_USER,
    port: process.env.DB_PORT,
  })

pool.connect()

module.exports = pool