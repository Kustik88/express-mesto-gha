const handlerError = (err, req, res, next) => {
  const {
    name,
    statusCode = (name === 'CastError' || name === 'ValidationError')
      ? 400
      : 500,
    message,
    stack,
  } = err

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
      stack,
    })
  next()
}

module.exports = handlerError
