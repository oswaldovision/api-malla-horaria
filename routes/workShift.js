const express = require('express')
const router = express.Router()
const {checkCors} = require('./../middleware/whiteList')
const {selectAll, execSp, execScript} = require('./../dbs/sql')

router.get('/', checkCors , (req, res, next) => {

  selectAll('mng.WorkShift', (err, data) => {
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
  let script = `SELECT * FROM [mng].[View_MNGResults] 
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

router.get('/sellers',(req,res) => {
  let script = `SELECT distinct SellerName FROM [mng].[View_MNGResults]`

  execScript(script, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

module.exports = router