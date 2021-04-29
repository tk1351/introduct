import { Request, Response } from 'express'
import User, { UserModel } from '../models/User'
import { ReqUser } from '../middleware/auth'

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
}
