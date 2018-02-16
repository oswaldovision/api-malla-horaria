const express = require('express')
const router = express.Router()
const {checkAdmin} = require('../../middleware/authorize')
const {checkCors} = require('../../middleware/whiteList')
const {selectAll, execSp, execScript} = require('../../DA/security/adminDA')

router.get('/:user', checkAdmin, (req, res, next) => {
  const getUsersScript = `SELECT U.IdUser,
                          U.Email,
                          U.Name,
                          U.Address,
                          U.Phone,
                          R.Name AS rol_name,
                          R.IdRol
                          FROM [dbo].[User] U
                          LEFT JOIN dbo.User_Rol UR ON U.IdUser = UR.IdUser
                          LEFT JOIN dbo.Rol R ON UR.IdRol = R.IdRol
                          WHERE R.IdApp = 1`
  execScript(getUsersScript, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

router.post('/:user', checkAdmin, (req, res, next) => {
  var params = [{
    paramName: 'Email',
    type: 'String',
    value: req.body.email
  },
    {
      paramName: 'Name',
      type: 'String',
      value: req.body.name
    },
    {
      paramName: 'Address',
      type: 'String',
      value: req.body.address
    },
    {
      paramName: 'Phone',
      type: 'String',
      value: req.body.phone
    },
    {
      paramName: 'IdRol',
      type: 'Int',
      value: req.body.idRol
    }]

  execSp('[dbo].[spInsertUser]', params, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

module.exports = router