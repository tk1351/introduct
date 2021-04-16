const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts')

router.get('/test', postsController.testRouter)

module.exports = router
