import express from 'express'
import postsController from '../controllers/posts'
import { auth } from '../middleware/auth'
import { check } from 'express-validator'

const router = express.Router()

router.get('/test', postsController.testRouter)
router.get('/', postsController.getAllPosts)
router.get('/:post_id', auth, postsController.getPostById)
router.post(
  '/',
  [
    auth,
    check('title', 'タイトルが必要です').not().isEmpty(),
    check('text', '本文が必要です').not().isEmpty(),
  ],
  postsController.createPost
)
router.put('/like/:post_id', auth, postsController.likePost)
router.put('/unlike/:post_id', auth, postsController.unlikePost)
router.delete('/:post_id', auth, postsController.deletePost)

export default router
