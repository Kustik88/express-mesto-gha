const userModel = require('../models/user')

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

const getUserById = (req, res) => {
  userModel
    .findById(req.params.id)
    .orFail(() => {
      throw new Error('NotFound')
    })
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({
          message: 'User Not Found',
        })
        return
      }
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body
  userModel.create({ name, about, avatar })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(' ')}` })
        return
      }
      res.status(500).send({
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
}
