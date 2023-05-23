const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/mestodb')
app.use(bodyParser.json())
app.get('/', (req, res) => {
  const users = []
  res.send(users)
})

app.post('/', (req, res) => {
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('Server is running')
})
