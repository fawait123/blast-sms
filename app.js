const express = require('express')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
require('dotenv').config()
const app = express()
const auth = require('./router/Auth')
const createError = require('http-errors')
const ResponseHelper = require('express-response-helper')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
const PORT = process.env.PORT

// response tersedia
// .respond([data] [, status] [, message]):
// .fail(messages [, status] [, code]):
// .respondCreated([data] [, message]):
// .respondDeleted([data] [, message]):
// .respondUpdated([data] [, message]):
// .respondNoContent():
// .failUnauthorized([description] [, code]):
// .failForbidden([description] [, code]):
// .failNotFound([description] [, code]):
// .failValidationError([description] [, code]):
// .failResourceExists([description] [, code]):
// .failResourceGone([description] [, code]):
// .failTooManyRequests([description] [, code]):
// .failServerError([description] [, code]):
// .json(data):
app.use(ResponseHelper.helper())
// initial route
app.use('/auth', auth)

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.fail(err.message, err.status, err.code)
})

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
})
