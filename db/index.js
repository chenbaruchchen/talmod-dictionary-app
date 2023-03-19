const { Pool } = require('pg')
 
  
var connectionString = process.env.connectionString
const pool = new Pool({
    connectionString,
  })
 
 
module.exports = {
  query: (text) => pool.query(text),
}


 