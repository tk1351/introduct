import express from 'express'
import postsController from '../controllers/posts'

const router = express.Router()

router.get('/test', postsController.testRouter)

export default router
