const express = require('express')
const router = express.Router()
const activeDirectory = require('activedirectory')

const config = {
  url: process.env.LDAP_url,
  baseDN: process.env.LDAP_baseDN,
  username: process.env.LDAP_username,
  password: process.env.LDAP_password
}

const ad = new activeDirectory(config)

router.post('/login', (req, res) => {
  let body = {'email': req.body.email, 'password': req.body.password}
  ad.authenticate(body.email, body.password, function (err, auth) {
    if (err || !auth) {
      res.status(401).send({message: `User not authorized: ${err}`})
      return
    }

    ad.findUser(body.email, (err, user) => {
      if (err || !user) {
        res.status(404).send({message: `error obtain user ${body.email}: ${err} `})
        return
      }
      res.status(200).send(user)
    })

  })
})

module.exports = router