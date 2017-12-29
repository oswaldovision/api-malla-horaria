const express = require('express')
const router = express.Router()
const cors = require('cors')
const {selectAll, execSp} = require('./../dbs/sql')

var whitelist = process.env.whitelist.split('|')
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.get('/',cors(corsOptions) , (req, res, next) => {

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

  execSp('spGetStores',params, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })

})

module.exports = router