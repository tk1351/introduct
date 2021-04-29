import { Request, Response } from 'express'
import User, { UserModel } from '../models/User'
import { ReqUser } from '../middleware/auth'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface LoginBody {
  email: string
  password: string
}

export default {
  testRouter: (_: Request, res: Response): void => {
    res.send('auth router')
  },
  getAuthUser: async (
    req: Request<string, any, ReqUser, any>,
    res: Response
  ) => {
    try {
      // id, name, avatarのみを返す
      const user = (await User.findById(req.body.user.id).select(
        '_id name avatar'
      )) as UserModel
      return res.json(user)
    } catch (err) {
      console.error(err)
      return res.status(500).send('Server Error')
    }
  },
  loginUser: async (
    req: Request<any, any, LoginBody, any, any>,
    res: Response
  ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(
        errors.array().map((error) => {
          return { msg: error.msg }
        })
      )
    }

    const { email, password } = req.body

    try {
      // ユーザーが存在するか確認
      let user = (await User.findOne({ email })) as UserModel
      if (!user) {
        return res.status(400).json([{ msg: 'ユーザーが存在しません' }])
      }

      // DBのパスワードと比較する
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json([{ msg: 'パスワードが正しくありません' }])
      }

      // jwtとuser情報を返す
      const payload: { user: { id: string } } = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        `${process.env.JWTSECRET}`,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          return res.json({
            token,
            userId: user.id as string,
            avatar: user.avatar,
            role: user.role,
          })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  },
}
