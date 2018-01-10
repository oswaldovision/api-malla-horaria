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

router.get('/', cors(corsOptions), (req, res, next) => {

  selectAll('results.WorkShift', (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

router.get('/fromSp', (req, res) => {

  var params = [{
    paramName: 'Id',
    type: 'Int',
    value: 11
  }]

  execSp('spGetStores', params, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })

})

router.get('/range', (req, res) => {
  let script = `SELECT * FROM [dbo].[View_MNGResults] 
                WHERE DateShift >= '${req.query.start}T00:00:00.000' AND 
                DateShift <= '${req.query.end}T12:00:00.000'
                ORDER by DateShift`

  execScript(script, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })

})

module.exports = router