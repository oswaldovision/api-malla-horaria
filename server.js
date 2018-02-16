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

const WorkShift = require('./routes/mango/workShift')
const securityRoute = require('./routes/security/security')
const ad = require('./routes/mango/ad')
const roles = require('./routes/security/roles')
const users = require('./routes/security/users')

// app.get('/', function (req, res) {
//   res.render('public/index.html')
// })
app.use(express.static(__dirname + '/public'));

app.use('/WorkShift', WorkShift)
app.use('/security', securityRoute)
app.use('/ad', ad)
app.use('/roles', roles)
app.use('/users', users)




app.listen(port, () => {
  console.log(`Server App Mango listening: ${port}`)
})

module.exports = {app}