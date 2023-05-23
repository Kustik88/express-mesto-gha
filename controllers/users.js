const userModel = require('../models/user')

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({})
    res.send(users)
  } catch (err) {
    res.status(500).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    })
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body)
    res.status(201).send(newUser)
  } catch (err) {
    res.status(500).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    })
  }
}

module.exports = {
  getUsers,
  createUser,
}
