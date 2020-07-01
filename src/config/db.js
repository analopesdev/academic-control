const { Pool } = require("pg")

module.exports = new Pool({
  user: 'postgres',
  password: "251623",
  host: "localhost",
  port: 5430,
  database: "gymmanager"
})