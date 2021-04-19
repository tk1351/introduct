const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.get('/test', postsController.testRouter)
router.get('/', postsController.getAllPosts)
router.get('/:post_id', postsController.getPostById)
router.get('/profile/:user_id', postsController.getPostsByUserId)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'タイトルが必要です').not().isEmpty(),
      check('text', '本文が必要です').not().isEmpty(),
    ],
  ],
  postsController.createPost
)

module.exports = router
