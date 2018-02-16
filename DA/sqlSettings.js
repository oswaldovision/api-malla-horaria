const sql = require('mssql')

const configAdminDb = {
  user: process.env.DB_ADMIN_USER,
  password: process.env.DB_ADMIN_PASSWORD,
  server: process.env.DB_ADMIN_SERVER,
  database: process.env.DB_ADMIN_DBNAME,
  options: {
    encrypt: true
  }
}

const configMngDb = {
  user: process.env.DB_MNG_USER,
  password: process.env.DB_MNG_PASSWORD,
  server: process.env.DB_MNG_SERVER,
  database: process.env.DB_MNG_DBNAME,
  options: {
    encrypt: true
  }
}

const dbAdmin = new sql.ConnectionPool(configAdminDb, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('ready connection with ADMIN DB sql')
})

const dbMng = new sql.ConnectionPool(configMngDb, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('ready connection with MNG DB sql')
})

module.exports = {dbAdmin, dbMng }