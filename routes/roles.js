const express = require('express')
const router = express.Router()
const cors = require('cors')
const {selectAll, execSp, execScript} = require('./../dbs/sql')

var whitelist = process.env.whitelist.split('|')
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error(`${origin} Not allowed by CORS`))
    }
  }
}

router.post('/', (req, res, next) => {
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

  execSp('[mng].[spInsertRol]', params, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

module.exports = router