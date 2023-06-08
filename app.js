const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const { errors } = require('celebrate')
const handlerError = require('./middlewares/handlerError')
const routerUsers = require('./routes/users')
const routerCards = require('./routes/cards')

const { PORT, DB_ADDRESS } = process.env
mongoose.connect(DB_ADDRESS)

const app = express()
app.use(bodyParser.json())
app.use(helmet())

app.use(routerUsers)
app.use(routerCards)
app.use(errors())
app.use(handlerError)
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' })
})

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`)
})
