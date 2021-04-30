import express from 'express'
import profileController from '../controllers/profile'
import { auth } from '../middleware/auth'
import { check } from 'express-validator'

const router = express.Router()

router.get('/test', profileController.testRouter)
router.get('/me', auth, profileController.getCurrentUserProfile)
router.post(
  '/',
  [auth, check('bio', '自己紹介が必要です').not().isEmpty()],
  profileController.createAndUpdateUserProfile
)

export default router
