const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../constants/statusCodes')

const errorHandler = (err, req, res, next) => {
  const {
    name,
    statusCode = name === ('CastError' || 'ValidationError')
      ? BAD_REQUEST
      : INTERNAL_SERVER_ERROR,
    message,
    stack,
  } = err
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? 'Ошибка сервера'
        : message,
      stack,
    })
  next()
}

module.exports = errorHandler
