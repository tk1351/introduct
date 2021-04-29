import express from 'express'
import authController from '../controllers/auth'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/test', authController.testRouter)
router.get('/', auth, authController.getAuthUser)

export default router
