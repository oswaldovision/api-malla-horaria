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

module.exports = {checkAdmin}