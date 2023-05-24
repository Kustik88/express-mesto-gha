const userModel = require('../models/user')
const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../constants/statusCodes')

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((e) => e.message).join(' ')}` })
        return
      }
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
      throw new Error('NotFound')
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound' || err.name === 'CastError') {
        res.status(404).send({
          message: 'Пользователь c таким id не найден',
        })
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body
  userModel.create({ name, about, avatar })
    .then((newUser) => res.status(CREATED).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((e) => e.message).join(' ')}` })
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
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
        upsert: true,
      },
    )
    .orFail(() => {
      throw new Error('NotFound')
    })
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({
          message: 'Пользователь c таким id не найден',
        })
        return
      }
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' })
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
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
        upsert: true,
      },
    )
    .orFail(() => {
      throw new Error('NotFound')
    })
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({
          message: 'Пользователь c таким id не найден',
        })
        return
      }
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' })
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
}
