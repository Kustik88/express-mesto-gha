const bcrypt = require('bcryptjs')
const userModel = require('../models/user')
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../constants/statusCodes')
const { createError } = require('../helpers/createError')

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

const getUserById = (req, res) => {
  const { userId } = req.params
  userModel
    .findById(userId)
    .orFail(() => createError('UserNotFoundError', 'Пользователь c таким id не найден'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'UserNotFoundError') {
        res.status(NOT_FOUND).send({
          message: `${err.message}`,
        })
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        })
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        })
      }
    })
}

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body
  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((newUser) => res.status(CREATED).send({
          _id: newUser._id,
          email: newUser.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((e) => e.message).join(' ')}` })
          } else {
            res.status(INTERNAL_SERVER_ERROR).send({
              message: 'Internal Server Error',
              err: err.message,
              stack: err.stack,
            })
          }
        })
    })
}

const editUserInfo = (req, res) => {
  const { name, about } = req.body
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(() => createError('UserNotFoundError', 'Пользователь c таким id не найден'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'userNotFoundError') {
        res.status(NOT_FOUND).send({
          message: err.message,
        })
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST)
          .send(
            err.name === 'ValidationError'
              ? { message: `${Object.values(err.errors).map((e) => e.message).join(' ')}` }
              : { message: 'Переданы некорректные данные в строке запроса' },
          )
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        })
      }
    })
}

const editUserAvatar = (req, res) => {
  const { avatar } = req.body
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(() => createError('UserNotFoundError', 'Пользователь c таким id не найден'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'userNotFoundError') {
        res.status(NOT_FOUND).send({
          message: err.message,
        })
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST)
          .send(
            err.name === 'ValidationError'
              ? { message: `${Object.values(err.errors).map((e) => e.message).join(' ')}` }
              : { message: 'Переданы некорректные данные в строке запроса' },
          )
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        })
      }
    })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
}
