const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const app = express()
app.use(bodyParser.json())

app.use(function (req, res, next) {
  req.headers.origin = req.headers.origin || req.headers.host
  next()
})

require('./config/config')

const testRoute = require('./routes/test')
const securityRoute = require('./routes/security')
const ad = require('./routes/ad')

// app.get('/', function (req, res) {
//   res.render('public/index.html')
// })
app.use(express.static(__dirname + '/public'));

app.use('/test', testRoute)
app.use('/security', securityRoute)
app.use('/ad', ad)



app.listen(port, () => {
  console.log(`Server App Mango listening: ${port}`)
})

module.exports = {app}