const ExistingEmailError = require('../errors/ExistingEmailError')
const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForbiddenError')
const UnauthorizedError = require('../errors/UnauthorizedError')

const createError = (errorName, errorMessage) => {
  throw new `${errorName}`(errorMessage)
}
module.exports = {
  createError,
}
