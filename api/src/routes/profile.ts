import express from 'express'
import profileController from '../controllers/profile'
import { auth } from '../middleware/auth'
import { check } from 'express-validator'

const router = express.Router()

router.get('/test', profileController.testRouter)
router.get('/', profileController.getAllProfiles)
router.get('/user/:user_id', profileController.getProfileByUserId)
router.get('/me', auth, profileController.getCurrentUserProfile)
router.post(
  '/',
  [auth, check('bio', '自己紹介が必要です').not().isEmpty()],
  profileController.createAndUpdateUserProfile
)
router.delete('/', auth, profileController.deleteProfile)

export default router
