const mongoose = require('mongoose')
const Post = require('../models/Post')
const User = require('../models/User')
const { validationResult } = require('express-validator')

module.exports = {
  testRouter: (req, res) => {
    res.status(200).send('Posts route')
  },
  getAllPosts: async (req, res) => {
    try {
      // 最新の投稿からソートする
      const posts = await Post.find().sort({ createdAt: -1 })
      res.json(posts)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.json(post)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.status(500).send('Server Error')
    }
  },
  getPostsByUserId: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.user_id }).sort({
        createdAt: -1,
      })
      if (!posts) {
        return res.status(400).json({ msg: '投稿がありません' })
      }
      res.json(posts)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.status(500).send('Server Error')
    }
  },
  createPost: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        url: req.body.url,
        user: req.body.id,
        name: user.name,
        avatar: user.avatar,
      })

      const post = await newPost.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
}
