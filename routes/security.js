const express = require('express')
const router = express.Router()
const url = require('url')
const {execSp, selectAll, execScript} = require('./../dbs/sql')

router.get('/RolesUser', (req, res) => {
  let url_parts = url.parse(req.url, true)
  let query = url_parts.query

  let params = [{
    paramName: 'Email',
    type: 'String',
    value: query.email
  }]

  execSp('[Sec].[spGetRoleByEmail]', params, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data.recordset)
  })
})

router.get('/Roles', (req, res) => {
  selectAll('Sec.Rol', (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data.recordset)
  })
})

router.post('/newRol', (req, res) => {
  let params = [{
    paramName: 'Name',
    type: 'String',
    value: req.body.name
  },
    {
      paramName: 'Description',
      type: 'String',
      value: req.body.description
    }
  ]

  execSp('[Sec].[spInsertRol]', params, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send({returnValue : data.returnValue})
  })

})

module.exports = router