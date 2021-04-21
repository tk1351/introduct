const User = require('../models/User')
const { validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = {
  testRouter: (req, res) => {
    res.status(200).send('Users route')
  },
  getAllUsers: async (req, res) => {
    User.find({}, (err, foundUser) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ msg: 'ユーザーが見つかりません' }] })
      }
      return res.status(200).json(foundUser)
    })
  },
  registerUser: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, avatarUrl, password } = req.body

    try {
      // ユーザーが存在するか確認
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).send({ msg: '既にユーザーが存在します' })
      }

      // Gravatarの取得
      const avatar = avatarUrl
        ? avatarUrl
        : gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
          })

      user = new User({
        name,
        email,
        password,
        avatar,
      })

      // passwordの暗号化
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      // jwtを返す
      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          return res.json({ token })
        }
      )
    } catch (err) {
      console.error(err)
      res.status(500).send('Server Error')
    }
  },
}
