const sql = require('mssql')

let typesMap = new Map()
typesMap.set('Int', sql.Int)
typesMap.set('String', sql.VarChar)
typesMap.set('Date', sql.DateTime2)

let execScript = (reqSql ,script,callback) => {
  let requestSql =  reqSql.request()
  requestSql.query(script,(err,result) => {
    if (err)
      callback(err)
    else
      callback(null, result)
  })
}

let selectAll = (reqSql, objSql, callback) => {
  let requestSql =  reqSql.request()
  requestSql.query(`select * from ${objSql}`, (err, result) => {
    if (err)
      callback(err)
    else
      callback(null, result)
  })
}

let execSp = (reqSql,nameSp ,params, callback) => {
  let requestSql =  reqSql.request()
  if (params.length > 0) {
    params.forEach(parameter => {
      requestSql.input(parameter.paramName, getType(parameter.type), parameter.value)
    })
  }

  requestSql.execute(nameSp, (err, result) => {
    if (err)
      callback(err)
    else
      callback(null, result)
  })
}

let getType = type => {
  return typesMap.get(type)
}

module.exports = {
  execSp,
  selectAll,
  execScript
}