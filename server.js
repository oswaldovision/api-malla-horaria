require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT
const app = express()
app.use(bodyParser.json())
app.set('view engine', 'pug')


const testRoute = require('./routes/test')
const securityRoute = require('./routes/security')
const ad = require('./routes/activeDirectory')


app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.use('/test', testRoute)
app.use('/security', securityRoute)
app.use('/ad', ad)

app.listen(port, () => {
  console.log(`Server App Mango listening: ${port}`)
})

module.exports = {app}