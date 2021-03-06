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
      const posts = await Post.find({ uid: req.params.user_id }).sort({
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
        uid: req.user.id,
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
  createComment: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.post_id)
      const newComment = {
        text: req.body.text,
        uid: req.user.id,
        name: user.name,
        avatar: user.avatar,
      }
      post.comments.unshift(newComment)
      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.status(500).send('Server Error')
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      // 投稿が既にlikeされているか確認する
      if (
        post.likes.filter((like) => like.uid.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: '投稿は既にlikeされてます' })
      }

      post.likes.unshift({ uid: req.user.id })
      await post.save()
      res.json(post.likes)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
  unlikePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      if (!post.likes.some((like) => like.uid.toString() === req.user.id)) {
        return res.status(404).json({ msg: '投稿にlikeがありません' })
      }

      post.likes = post.likes.filter(
        ({ uid }) => uid.toString() !== req.user.id
      )

      await post.save()
      res.json(post.likes)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      // 記事を投稿したユーザーか確認する
      if (post.uid.toString() !== req.user.id) {
        return res.status(401).json({ msg: '削除する権限がありません' })
      }

      await post.remove()
      res.json({ msg: '投稿は削除されました' })
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.status(500).send('Server Error')
    }
  },
  deleteComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      // コメントを取得する
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      )
      if (!comment) {
        return res.status(404).json({ msg: 'コメントがありません' })
      }

      // コメントをしたuserか確認する
      if (comment.uid.toString() !== req.user.id) {
        return res.status(401).json({ msg: '削除する権限がありません' })
      }

      // 削除するコメントを取得する
      const removeIndex = post.comments.map((comment) =>
        comment.uid.toString().indexOf(req.user.id)
      )

      post.comments.splice(removeIndex, 1)
      await post.save()
      res.json(post.comments)
    } catch (error) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
}
