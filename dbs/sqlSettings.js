const sql = require('mssql')

// Create connection to database
const config = {
  user: 'admin-test',
  password: 'Dilis1088*',
  server: 'server-dbvision-test.database.windows.net',
  database: 'testSqlDb',
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