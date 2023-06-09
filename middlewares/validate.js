/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate')
const mongoose = require('mongoose')
const { regexForLink } = require('../constants/regex')

const validateUserParams = celebrate({
  params: Joi.object().keys({
    userId: Joi.alternatives().try(
      Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid user ID')
        }
        return value
      }),
      Joi.string().valid('me'),
    ),
  }),
})

const validateUserBodyForAuth = celebrate({
  body: Joi.object({
    name: Joi
      .string()
      .default('Жак-Ив Кусто')
      .min(2)
      .max(30),
    about: Joi
      .string()
      .default('Исследователь')
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .regex(regexForLink),
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
  }),
})
const validateUserBody = celebrate({
  body: Joi.object({
    name: Joi
      .string()
      .default('Жак-Ив Кусто')
      .min(2)
      .max(30),
    about: Joi
      .string()
      .default('Исследователь')
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .regex(regexForLink),
  }),
})

const validateCardBodyForPost = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(regexForLink),
    owner: Joi.object().keys({
      _id: Joi.string,
    }),
    likes: Joi.array().unique().items(Joi.string()),
  }),
})

const validateCardParams = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid card ID')
      }
      return value
    }),
  }),
})

module.exports = {
  validateUserBody,
  validateUserParams,
  validateUserBodyForAuth,
  validateCardBodyForPost,
  validateCardParams,
}
