const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../constants/statusCodes')

const ExistingEmailError = require('../errors/ExistingEmailError')
const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForBiddenError')
const UnauthorizedError = require('../errors/UnauthorizedError')
// const { createError } = require('../helpers/createError')

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
    .orFail(() => {
      throw new NotFoundError('Пользователь c таким id не найден')
    })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
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

const getCurrentUser = (req, res) => {
  const { userId } = req.user._id
  userModel
    .findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь c таким id не найден')
    })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
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

// eslint-disable-next-line consistent-return
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body
  if (!password) {
    return next(new BadRequestError('Поле "password" является обязательным'))
  }
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
          about: newUser.about,
          avatar: newUser.avatar,
        }))
        .catch(next)
    })
    .catch(next)
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
    .orFail(() => {
      throw new NotFoundError('Пользователь c таким id не найден')
    })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
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
    .orFail(() => {
      throw new NotFoundError('Пользователь c таким id не найден')
    })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
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

const loginUser = (req, res) => {
  const { email, password } = req.body
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'long-key-word',
        { expiresIn: '7d' },
      )
      res.send({ token })
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        res.status(err.statusCode).send({
          message: err.message,
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

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
  loginUser,
}
