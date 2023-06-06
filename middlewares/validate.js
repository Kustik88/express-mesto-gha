/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate')

const validateUserParams = celebrate({
  params: Joi.object().unknown().keys({
    userId: Joi
      .string()
      .length(24)
      .regex(/[a-z0-9]/)
      .when(Joi.object({
        userId: Joi.string().regex(/^\/users/).required(),
      }).unknown(), {
        then: Joi.string().regex(/^\/users\/(?!me).*$/).required(),
      }),
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
      .regex(/^https?:\/\/(www.)?[a-z0-9-._~:\/?#\[\]@!$&'()*+,;=]+/),
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
      .regex(/^https?:\/\/(www.)?[a-z0-9-._~:\/?#\[\]@!$&'()*+,;=]+/),
  }),
})
const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.object().required().keys({
      _id: Joi.string,
    }),
    likes: Joi.array().unique().items(Joi.string()),
  }),
})

module.exports = {
  validateUserBody,
  validateUserParams,
  validateUserBodyForAuth,
  validateCardBody,
}
