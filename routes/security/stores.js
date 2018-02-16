const express = require('express')
const router = express.Router()
const {checkAdmin} = require('../../middleware/authorize')
const {checkCors} = require('../../middleware/whiteList')
const {selectAll, execSp, execScript} = require('../../DA/security/adminDA')

router.get('/:user', checkAdmin, (req, res, next) => {
  selectAll('dbo.Stores', (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

router.post('/', (req, res, next) => {
  var params = [{
    paramName: 'name',
    type: 'String',
    value: req.body.name
  },
    {
      paramName: 'phone',
      type: 'String',
      value: req.body.phone
    },
    {
      paramName: 'address',
      type: 'String',
      value: req.body.address
    }]

  execSp('[dbo].[spInsertStore]', params, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

module.exports = router