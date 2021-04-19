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
router.post(
  '/comment/:post_id',
  [auth, [check('text', '本文が必要です').not().isEmpty()]],
  postsController.createComment
)
router.put('/like/:post_id', auth, postsController.likePost)
router.put('/unlike/:post_id', auth, postsController.unlikePost)
router.delete('/:post_id', auth, postsController.deletePost)
router.delete(
  '/comment/:post_id/:comment_id',
  auth,
  postsController.deleteComment
)

module.exports = router
