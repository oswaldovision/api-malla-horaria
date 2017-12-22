const sql = require('./sqlSettings')
let sqlReq = new sql.Request()

let typesMap = new Map()
typesMap.set('Int', sql.Int)
typesMap.set('String', sql.VarChar)
typesMap.set('Date', sql.DateTime2)

let execScript = (script,callback) => {
  sqlReq.query(script,(err,result) => {
    if (err)
      callback(err)
    else
      callback(null, result)
  })
}

let selectAll = (objSql, callback) => {
  sqlReq.query(`select * from ${objSql}`, (err, result) => {
    if (err)
      callback(err)
    else
      callback(null, result)
  })
}

let execSp = (nameSp ,params, callback) => {
  let requestSql = new sql.Request()
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

module.exports = {selectAll, execSp,execScript}