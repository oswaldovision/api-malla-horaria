const {dbAdmin} = require('../sqlSettings')
const repository = require('../repository')

let execScript = (script, callback) => {
  return repository.execScript(dbAdmin, script, callback)
}

let selectAll = (objSql, callback) => {
  return repository.selectAll(dbAdmin, objSql, callback)
}

let execSp = (nameSp, params, callback) => {
  return repository.execSp(dbAdmin, nameSp, params, callback)
}

module.exports = {selectAll, execSp, execScript}