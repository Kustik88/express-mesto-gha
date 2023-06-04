const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' })
  }
  const token = authorization.replace('Bearer ', '')
  let payload
  try {
    payload = jwt.verify(token, 'long-key-word')
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' })
  }
  req.user = payload
  next()
}

module.exports = auth
