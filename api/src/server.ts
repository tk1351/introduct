import app from './app'
import { connectDB } from './config/db'

connectDB()

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('Server start')
})
