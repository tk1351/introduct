const Profile = require('../models/Profile')
const User = require('../models/User')
const Post = require('../models/Post')
const { validationResult } = require('express-validator')

module.exports = {
  testRouter: (req, res) => {
    res.status(200).send('Profile route')
  },
  getAllProfiles: async (req, res) => {
    try {
      // Profileのrefからnameとavatarを追加する
      const profiles = await Profile.find().populate('uid', ['name', 'avatar'])
      res.json(profiles)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
  getProfileByUserId: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        uid: req.params.user_id,
      }).populate('uid', ['name', 'avatar'])

      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'このユーザーのプロフィールは存在しません' })
      }
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'プロフィールは存在しません' })
      }
      res.status(500).send('Server Error')
    }
  },
  getCurrentUserProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        uid: req.user.id,
      }).populate('uid', ['name', 'avatar'])
      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'ユーザーのプロフィールが存在しません' })
      }
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
  createAndUpdateUserProfile: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(
        errors.array().map((error) => {
          return { msg: error.msg }
        })
      )
    }

    const {
      company,
      website,
      location,
      bio,
      twitter,
      facebook,
      linkedin,
      instagram,
      youtube,
    } = req.body

    // profileを作成する
    const profileFields = {}
    profileFields.uid = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio

    // sns部分を作成する
    profileFields.social = {}
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram
    if (youtube) profileFields.social.youtube = youtube

    try {
      let profile = await Profile.findOne({ uid: req.user.id })
      if (profile) {
        // 更新する
        profile = await Profile.findOneAndUpdate(
          { uid: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }

      // 無ければ新たに作成する
      profile = new Profile(profileFields)
      await profile.save()
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
  deleteProfile: async (req, res) => {
    try {
      await Profile.findOneAndRemove({ uid: req.user.id })
      await User.findOneAndRemove({ _id: req.user.id })
      await Post.deleteMany({ uid: req.user.id })
      res.json({ msg: 'ユーザーは削除されました' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
}
