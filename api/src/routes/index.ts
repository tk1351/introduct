import express from 'express'
import authRoutes from '../routes/auth'
import postsRoutes from '../routes/posts'
import profileRoutes from '../routes/profile'
import usersRoutes from '../routes/users'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/posts', postsRoutes)
router.use('/profile', profileRoutes)
router.use('/users', usersRoutes)

export default router
