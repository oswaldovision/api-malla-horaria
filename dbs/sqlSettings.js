const sql = require('mssql')

const config = {
  user: process.env.DB_CONFIG_user,
  password: process.env.DB_CONFIG_password,
  server: process.env.DB_CONFIG_server,
  database: process.env.DB_CONFIG_database,
  options: {
    encrypt: true
  }
}

sql.connect(config, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('ready connection with sql')

})

module.exports = sql