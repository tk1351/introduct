const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

module.exports = {
  testRouter: (req, res) => {
    res.status(200).send('Auth route')
  },
  getAuthUser: async (req, res) => {
    try {
      // id, name, avatarのみ返す
      const user = await User.findById(req.user.id).select('_id name avatar')
      return res.json(user)
    } catch (err) {
      console.error(err)
      return res.status(500).send('Server Error')
    }
  },
  loginUser: async (req, res) => {
    console.log('req', validationResult(req))
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
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json([{ msg: 'ユーザーが存在しません' }])
      }

      // DBのパスワードと比較する
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json([{ msg: 'パスワードが正しくありません' }])
      }

      // jwtを返す
      const payload = {
        user: { id: user.id },
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          return res.json({
            token,
            userId: user.id,
            avatar: user.avatar,
            name: user.name,
          })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  },
}
