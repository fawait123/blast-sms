const Auth = require('../controllers/Auth')

const router = require('express').Router()

router.get('/login', Auth.login)

module.exports = router
