import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ProfileBody } from '../controllers/profile'

dotenv.config()

export interface ReqAuthUser {
  user: { id: string }
}

interface DecodedUser extends ReqAuthUser {
  iat: number
  exp: number
}

export const auth = (
  req: Request<any, any, ReqAuthUser | ProfileBody, any>,
  res: Response,
  next: NextFunction
) => {
  // headerからtokenを取得
  const token = req.header('x-auth-token') as string

  // tokenの有無を確認
  if (!token)
    return res.status(401).json({ msg: 'Tokenが無いため認証が拒否されました' })

  // tokenを確認する
  try {
    const decoded = jwt.verify(token, `${process.env.JWTSECRET}`) as DecodedUser
    req.body.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Tokenが正しくありません' })
  }
}
