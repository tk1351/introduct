import { Request, Response } from 'express'
import Profile, { ProfileModel } from '../models/Profile'
import User from '../models/User'
import { ReqAuthUser } from '../middleware/auth'
import { validationResult } from 'express-validator'

type ProfileFields = {
  uid: string
  company: string
  website: string
  location: string
  bio: string
  social: {
    twitter: string
    facebook: string
    linkedin: string
    instagram: string
    youtube: string
  }
}

export interface ProfileBody extends ReqAuthUser {
  uid: string
  company: string
  website: string
  location: string
  bio: string
  twitter: string
  facebook: string
  linkedin: string
  instagram: string
  youtube: string
}

export default {
  testRouter: (_: Request, res: Response): void => {
    res.send('profile router')
  },
  getAllProfiles: async (
    _: Request,
    res: Response<ProfileModel[] | { msg: string }>
  ) => {
    try {
      const profiles = await Profile.find().populate('uid', ['name', 'avatar'])
      res.json(profiles)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ msg: 'Server Error' })
    }
  },
  getProfileByUserId: async (
    req: Request,
    res: Response<ProfileModel | { msg: string }>
  ) => {
    try {
      const profile = (await Profile.findOne({
        uid: req.params.user_id,
      }).populate('uid', ['name', 'avatar'])) as ProfileModel

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
      res.status(500).send({ msg: 'Server Error' })
    }
  },
  getCurrentUserProfile: async (
    req: Request<any, any, ReqAuthUser>,
    res: Response<ProfileModel | { msg: string }>
  ) => {
    try {
      const profile = await Profile.findOne({
        uid: req.body.user.id,
      }).populate('uid', ['name', 'avatar'])
      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'ユーザーのプロフィールが存在しません' })
      }
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ msg: 'Server Error' })
    }
  },
  createAndUpdateUserProfile: async (
    req: Request<any, any, ProfileBody>,
    res: Response<ProfileModel | { msg: string }[]>
  ) => {
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
    const profileFields: ProfileFields = {
      uid: '',
      company: '',
      website: '',
      location: '',
      bio: '',
      social: {
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        youtube: '',
      },
    }
    profileFields.uid = req.body.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio

    // sns部分を作成する
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram
    if (youtube) profileFields.social.youtube = youtube

    try {
      let profile = (await Profile.findOne({
        uid: req.body.user.id,
      })) as ProfileModel
      if (profile) {
        // 更新する
        profile = (await Profile.findOneAndUpdate(
          { uid: req.body.user.id },
          { $set: profileFields },
          { new: true }
        )) as ProfileModel
        return res.json(profile)
      }

      // 無ければ新たに作成する
      profile = new Profile(profileFields)
      await profile.save()
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send([{ msg: 'Server Error' }])
    }
  },
  deleteProfile: async (
    req: Request<any, any, ProfileBody>,
    res: Response<{ msg: string }>
  ) => {
    try {
      // @todo - ユーザーの投稿も削除する
      await Profile.findOneAndRemove({ uid: req.body.user.id })
      await User.findOneAndRemove({ _id: req.body.user.id })
      res.json({ msg: 'ユーザーは削除されました' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ msg: 'Server Error' })
    }
  },
}
