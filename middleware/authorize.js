const {selectAll, execSp, execScript} = require('../DA/security/adminDA')

let checkAdmin = (req,res,next) =>{
  const user = req.params['user'] || req.body.user
  if (user == null){
    res.status(401).send({ message : 'se requiere ser administrador'})
  }

  var params = [{
    paramName: 'Email',
    type: 'String',
    value: user
  }]
  execSp('[dbo].[spCheckIsAdminApp]',params ,(err,data) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    if (!data.returnValue){
      res.status(401).send({message : 'No autorizado'})
      return
    }
    next()
  })
}

let checkAuthStore = (req,res,next) => {
  const user = req.params['user'] || req.body.user
  if (user == null){
    res.status(401).send({ message : 'se requiere un username autorizado'})
  }

  var params = [{
    paramName: 'Email',
    type: 'String',
    value: user
  }]
  execSp('[dbo].[spGetRolesStoresByEmail]',params ,(err,data) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    if (!data.recordset.length){
      res.status(401).send({message : 'No autorizado'})
      return
    }
    addRolesToReq(req,data.recordset)
    addStoresToReq(req,data.recordset)
    next()
  })


}

const addRolesToReq = (req,data) => {
  req.roles = data.map(rol => {
    return {idRol : rol.IdRol, rolName : rol.Rol}
  })
}

const addStoresToReq = (req,data) => {
  req.stores = data.map(store => {
    return {idStore : store.IdStore, storeName : store.Store}
  })
}

module.exports = {checkAdmin, checkAuthStore}