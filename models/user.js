const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длинна поля "name" - 2'],
    maxlength: [30, 'Максимальная длинна поля "name" - 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    default: 'Исследователь',
    minlength: [2, 'Минимальная длинна поля "about" - 2'],
    maxlength: [30, 'Максимальная длинна поля "about" - 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "avatar" должно быть заполнено'],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
  },
}, { versionKey: false })

module.exports = mongoose.model('user', userSchema)
