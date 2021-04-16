const app = require('./app')
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db')

connectDB()

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
