import express from 'express'
import postsController from '../controllers/posts'

const router = express.Router()

router.get('/', postsController.testRouter)

export default router
