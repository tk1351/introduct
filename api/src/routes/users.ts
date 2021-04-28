import express from 'express'
import usersController from '../controllers/users'
import { check } from 'express-validator'

const router = express.Router()

router.get('/test', usersController.testRouter)
router.get('/', usersController.getAllUsers)
router.post(
  '/',
  [
    check('name', '名前が必要です').not().isEmpty(),
    check('email', '正しいメールアドレスを入力してください').isEmail(),
    check('password', '6文字以上のパスワードを設定してください').isLength({
      min: 6,
    }),
  ],
  usersController.registerUser
)

export default router
