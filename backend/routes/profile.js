const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')

router.get('/test', profileController.testRouter)

module.exports = router
