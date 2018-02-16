const {dbMng} = require('../sqlSettings')
const repo = require('../repository')

let execScript = (script, callback) => {
  return repo.execScript(dbMng, script, callback)
}

let selectAll = (objSql, callback) => {
  return repo.selectAll(dbMng, objSql, callback)
}

let execSp = (nameSp, params, callback) => {
  return repo.execSp(dbMng,nameSp, params, callback)
}

module.exports = {selectAll, execSp, execScript}