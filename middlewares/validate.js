/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate')

const validateUserParams = celebrate({
  params: Joi.object().unknown().keys({
    userId: Joi.string().alphanum().required(),
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
    name: Joi.string().min(2).max(30),
    link: Joi.string().regex(/^https?:\/\/(www.)?[a-z0-9-._~:\/?#\[\]@!$&'()*+,;=]+/),
    owner: Joi.object().keys({
      _id: Joi.string,
    }),
    likes: Joi.array().unique().items(Joi.string()),
  }),
})

const validateCardBodyForPost = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(/^https?:\/\/(www.)?[a-z0-9-._~:\/?#\[\]@!$&'()*+,;=]+/),
    owner: Joi.object().keys({
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
  validateCardBodyForPost,
}
