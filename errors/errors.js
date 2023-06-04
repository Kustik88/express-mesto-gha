const ExistingEmailError = require('./ExistingEmailError')
const NotFoundError = require('./NotFoundError')
const ForbiddenError = require('./ForbiddenError')
const UnauthorizedError = require('./UnauthorizedError')

const createError = (errorName, errorMessage) => {
  const error = new Error(errorMessage)
  error.name = errorName
  throw error
}

module.exports = {
  createError,
}
