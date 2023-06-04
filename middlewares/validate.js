const { celebrate, Joi } = require('celebrate')

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.object().required().keys({
      _id: Joi.string,
    }),
    likes: Joi.array([
      Joi.string(),
    ]),
  }),
})

module.exports = {
  validateUserBody,
  validateCardBody,
}
