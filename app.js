const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { PORT = 3000 } = process.env

const app = express()

mongoose.connect('mongodb://localhost:27017/mestodb')
app.use(bodyParser.json())
app.get('/users', (req, res) => {
  const users = []
  res.send(users)
})

app.post('/users', (req, res) => {
  res.send(req.body)
})

app.listen(PORT, () => {
  console.log('Server is running')
})
