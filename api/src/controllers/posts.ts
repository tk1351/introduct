import { Request, Response } from 'express'
import Post, { PostModel } from '../models/Post'
import User, { UserModel } from '../models/User'
import { validationResult } from 'express-validator'
import { ReqAuthUser } from '../middleware/auth'

interface PostBody extends ReqAuthUser {
  title: string
  text: string
  imageUrl: string
  url: string
}
interface PostFields {
  title: string
  text: string
  imageUrl: string
  url: string
  uid: string
  name: string
  avatar: string
}

interface CommentFields {
  uid: string
  text: string
  name: string
  avatar: string
  date: Date
}

export default {
  testRouter: (_: Request, res: Response): void => {
    res.send('posts router')
  },
  getAllPosts: async (
    _: Request,
    res: Response<PostModel[] | { msg: string }>
  ) => {
    try {
      // 最新の投稿からソートする
      const posts = await Post.find().sort({ createdAt: -1 })
      res.json(posts)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ msg: 'Server Error' })
    }
  },
  getPostById: async (
    req: Request<{ post_id: string }>,
    res: Response<PostModel | { msg: string }>
  ) => {
    try {
      const post = (await Post.findById(req.params.post_id)) as PostModel
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.json(post)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.status(500).send({ msg: 'Server Error' })
    }
  },
  createPost: async (
    req: Request<any, any, PostBody>,
    res: Response<PostModel | { msg: string }[]>
  ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(
        errors.array().map((error) => {
          return { msg: error.msg }
        })
      )
    }

    try {
      const user = (await User.findById(req.body.user.id).select(
        '-password'
      )) as UserModel
      const postFields: PostFields = {
        title: '',
        text: '',
        imageUrl: '',
        url: '',
        uid: '',
        name: '',
        avatar: '',
      }

      postFields.title = req.body.title
      postFields.text = req.body.text
      postFields.imageUrl = req.body.imageUrl
      postFields.url = req.body.url
      postFields.uid = req.body.user.id
      postFields.name = user.name
      postFields.avatar = user.avatar

      const newPost = new Post(postFields)

      const post = await newPost.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send([{ msg: 'Server Error' }])
    }
  },
  createComment: async (
    req: Request<{ post_id: string }, any, PostBody>,
    res: Response<CommentFields[] | { msg: string }[]>
  ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(
        errors.array().map((error) => {
          return { msg: error.msg }
        })
      )
    }

    try {
      const user = (await User.findById(req.body.user.id).select(
        '-password'
      )) as UserModel
      const post = (await Post.findById(req.params.post_id)) as PostModel
      const commentFields: CommentFields = {
        text: '',
        uid: '',
        name: '',
        avatar: '',
        date: new Date(),
      }

      commentFields.text = req.body.text
      commentFields.uid = req.body.user.id
      commentFields.name = user.name
      commentFields.avatar = user.avatar
      commentFields.date = new Date()

      post.comments.unshift(commentFields)
      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json([{ msg: '投稿がありません' }])
      }
      res.status(500).send([{ msg: 'Server Error' }])
    }
  },
  likePost: async (
    req: Request<{ post_id: string }, any, PostBody>,
    res: Response<{ uid: string }[] | { msg: string }>
  ) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      // 投稿が既にlikeされているか確認する
      if (
        post.likes.filter((like) => like.uid === req.body.user.id).length > 0
      ) {
        return res.status(400).json({ msg: '投稿は既にlikeされてます' })
      }

      post.likes.unshift({ uid: req.body.user.id })
      await post.save()
      res.json(post.likes)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ msg: 'Server Error' })
    }
  },
  unlikePost: async (
    req: Request<{ post_id: string }, any, PostBody>,
    res: Response<{ uid: string }[] | { msg: string }>
  ) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      if (!post.likes.some((like) => like.uid == req.body.user.id)) {
        return res.status(404).json({ msg: '投稿にあなたのlikeがありません' })
      }

      post.likes = post.likes.filter(({ uid }) => uid != req.body.user.id)
      await post.save()
      res.json(post.likes)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ msg: 'Server Error' })
    }
  },
  deletePost: async (
    req: Request<{ post_id: string }, any, PostBody>,
    res: Response<{ msg: string }>
  ) => {
    try {
      const post = await Post.findById(req.params.post_id)
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      // 記事を投稿したユーザーか確認する
      if (post.uid.toString() !== req.body.user.id) {
        return res.status(401).json({ msg: '削除する権限がありません' })
      }

      await post.remove()
      res.json({ msg: '投稿は削除されました' })
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: '投稿がありません' })
      }
      res.status(500).send({ msg: 'Server Error' })
    }
  },
  deleteComment: async (
    req: Request<{ post_id: string; comment_id: string }, any, PostBody>,
    res: Response<CommentFields[] | { msg: string }>
  ) => {
    try {
      const post = (await Post.findById(req.params.post_id)) as PostModel
      if (!post) {
        return res.status(404).json({ msg: '投稿がありません' })
      }

      // コメントを取得する
      const comment = post.comments.find(
        (comment) => comment?._id == req.params.comment_id
      )
      if (!comment) {
        return res.status(404).json({ msg: 'コメントがありません' })
      }

      // コメントをしたuserか確認する
      if (comment.uid != req.body.user.id) {
        return res.status(401).json({ msg: '削除する権限がありません' })
      }

      // 削除するコメントを取得する
      post.comments = post.comments.filter((elm) => elm._id != comment._id)

      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ msg: 'Server Error' })
    }
  },
}
