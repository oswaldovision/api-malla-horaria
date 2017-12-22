require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT

const testRoute = require('./routes/test')
const securityRoute = require('./routes/security')
const ad = require('./routes/activeDirectory')

app.use('/test', testRoute)
app.use('/security', securityRoute)
app.use('/ad', ad)

app.listen(port, () => {
  console.log(`Server App Mango listening: ${port}`)
})

module.exports = {app}