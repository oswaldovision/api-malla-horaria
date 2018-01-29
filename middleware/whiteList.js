const cors = require('cors')

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

let checkCors = (req,res,next) => {
  cors(corsOptions)
  next()
}

module.exports = {checkCors}