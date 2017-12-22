const express = require('express')
const router = express.Router()
const {selectAll, execSp} = require('./../dbs/sql')

router.get('/', (req, res) => {

  selectAll('stores', (err, data) => {
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