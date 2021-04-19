const mongoose = require('mongoose')
const Post = require('../models/Post')

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
}
