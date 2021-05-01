import express, { Request, Response } from 'express'
import User, { UserModel } from '../models/User'
import { validationResult } from 'express-validator'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface RegisterBody {
  name: string
  email: string
  avatarUrl: string
  password: string
}

export interface ResponseBody {
  token: string | undefined
  userId: string
  avatar: string
  role: string
}

export default {
  testRouter: (_: Request, res: Response): void => {
    res.send('users router')
  },
  getAllUsers: (_: Request, res: Response<UserModel[] | { msg: string }>) => {
    User.find({}, (err, foundUser) => {
      if (err) {
        return res.status(422).send({ msg: 'ユーザーが見つかりません' })
      }
      return res.status(200).json(foundUser)
    })
  },
  registerUser: async (
    req: Request<any, any, RegisterBody>,
    res: Response<ResponseBody | { msg: string }[]>
  ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(
        errors.array().map((error) => {
          return { msg: error.msg }
        })
      )
    }

    const { name, email, avatarUrl, password } = req.body

    try {
      // ユーザーが存在するか確認
      let user = (await User.findOne({ email })) as UserModel
      if (user) {
        return res.status(400).send([{ msg: '既にユーザーが存在します' }])
      }

      // Gravatarの取得
      const avatar = avatarUrl
        ? avatarUrl
        : gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

      const role = 'user'

      user = new User({
        name,
        email,
        password,
        avatar,
        role,
      })

      // passwordの暗号化
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

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
            userId: user.id,
            avatar: user.avatar,
            role: user.role,
          })
        }
      )
    } catch (err) {
      console.error(err)
      res.status(500).send([{ msg: 'Server Error' }])
    }
  },
}
