const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routerUsers = require('./routes/users')

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
const app = express()
app.use(bodyParser.json())
app.use(routerUsers)

app.listen(3000, () => {
  console.log('Server is running')
})
