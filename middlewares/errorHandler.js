const errorHandler = (err, req, res, next) => {
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
}
