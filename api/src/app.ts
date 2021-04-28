import express from 'express'
import router from './routes/index'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

app.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello world')
})

export default app
