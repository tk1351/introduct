const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/test', authController.testRouter)

module.exports = router
