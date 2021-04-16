const express = require('express')
const app = express()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const router = require('./routes')
app.use('/api/v1', router)

module.exports = app
