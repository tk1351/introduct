import express from 'express'
import authController from '../controllers/auth'

const router = express.Router()

router.get('/', authController.testRouter)

export default router
