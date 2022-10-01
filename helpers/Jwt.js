const JWT = require('jsonwebtoken')
require('dotenv').config()
const JsonWebToken = {
  signin: (payload) => {
    return new Promise((resolve, reject) => {
      JWT.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d', algorithm: 'RS256' },
        (err, token) => {
          if (err) return reject(err)

          resolve(token)
        },
      )
    })
  },
  verify: (token) => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.JWT_SECRET, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  },
}

module.exports = JsonWebToken
