import express from 'express'
import profileController from '../controllers/profile'

const router = express.Router()

router.get('/', profileController.testRouter)

export default router
