import express from 'express'
import authController from '../controllers/auth'
import { auth } from '../middleware/auth'
import { check } from 'express-validator'

const router = express.Router()

router.get('/test', authController.testRouter)
router.get('/', auth, authController.getAuthUser)
router.post(
  '/',
  [
    check('email', '正しいメールアドレスを入力してください').isEmail(),
    check('password', 'パスワードを入力してください').exists(),
  ],
  authController.loginUser
)

export default router
