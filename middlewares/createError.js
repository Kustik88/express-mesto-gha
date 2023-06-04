const ExistingEmailError = require('../errors/ExistingEmailError')
const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForbiddenError')
const UnauthorizedError = require('../errors/UnauthorizedError')

const createError = (error, errorMessage) => {
  throw new `${error}`(errorMessage)
}

module.exports = {
  createError,
}
