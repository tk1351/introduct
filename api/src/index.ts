import express from 'express'
import { connectDB } from './config/db'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log('start')
})

app.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello world')
})
