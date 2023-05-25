const createError = (errorName, errorMessage) => {
  const error = new Error(errorMessage)
  error.name = errorName
  throw error
}

module.exports = {
  createError,
}
