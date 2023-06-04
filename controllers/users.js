const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const {
  OK,
  CREATED,
} = require('../constants/statusCodes')
// const { createError } = require('../middlewares/createError')
const ExistingEmailError = require('../errors/ExistingEmailError')
const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForbiddenError')
const UnauthorizedError = require('../errors/UnauthorizedError')

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next)
}

const getUserById = (req, res, next) => {
  const { userId } = req.params
  userModel
    .findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь c таким id не найден')
    })
    .then((user) => res.status(OK).send(user))
    .catchcatch(next)
}

const getCurrentUser = (req, res, next) => {
  const { userId } = req.user._id
  userModel
    .findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь c таким id не найден')
    })
    .then((user) => res.status(OK).send(user))
    .catch(next)
}

const createUser = (req, res, next) => {
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
        .catch(next)
    })
}

const editUserInfo = (req, res, next) => {
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
    .catch(next)
}

const editUserAvatar = (req, res, next) => {
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
    .catch(next)
}

const loginUser = (req, res, next) => {
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
    .catch(next)
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
