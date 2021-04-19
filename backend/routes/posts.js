const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts')

router.get('/test', postsController.testRouter)
router.get('/', postsController.getAllPosts)
router.get('/:post_id', postsController.getPostById)

module.exports = router
