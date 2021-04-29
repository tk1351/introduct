import express from 'express'
import authController from '../controllers/auth'

const router = express.Router()

router.get('/test', authController.testRouter)

export default router
