const express = require('express')
const router = express.Router()
const {checkAdmin} = require('../../middleware/authorize')
const {checkCors} = require('../../middleware/whiteList')
const {selectAll, execSp, execScript} = require('../../DA/security/adminDA')

router.get('/:user', checkAdmin, (req, res, next) => {
  selectAll('dbo.Rol', (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

router.post('/', checkAdmin, (req, res, next) => {
  var params = [{
    paramName: 'Name',
    type: 'String',
    value: req.body.name
  },
    {
      paramName: 'Description',
      type: 'String',
      value: req.body.description
    }]

  if (req.body.idStore){
    params.push({
      paramName: 'id_store',
      type: 'Int',
      value: req.body.idStore
    })
  }

  execSp('[dbo].[spInsertRol]', params, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

module.exports = router