const express = require('express')
const router = express.Router()
const {checkCors} = require('../../middleware/whiteList')
const {selectAll, execSp, execScript} = require('../../DA/mango/mangoDA')

router.get('/', checkCors , (req, res, next) => {

  selectAll('[dbo].[View_MNGResults]', (err, data) => {
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

router.get('/sellers',(req,res) => {
  let script = `SELECT distinct SellerName FROM [dbo].[View_MNGResults]`

  execScript(script, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

router.get('/sellersProjection/:month',(req,res) =>{
  let month = req.params.month || (new Date().getMonth()+1);
  let script = `SELECT SellerName,DateShift, Store, State  FROM [dbo].[View_MNGResults] WHERE MONTH(DateShift) = ${month}  ORDER BY Store, DateShift,SellerName`

  execScript(script, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(data)
  })
})

module.exports = router