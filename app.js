const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routerUsers = require('./routes/users')
const routerCards = require('./routes/cards')

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  req.user = {
    _id: '646cfe1a939835021a970a0c',
  }

  next()
})
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' })
})

app.use(routerUsers)
app.use(routerCards)

app.listen(3000, () => {
  console.log('Server is running')
})
