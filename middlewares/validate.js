const { celebrate, Joi } = require('celebrate')

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .default('Жак-Ив Кусто')
      .required()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .default('Исследователь')
      .required()
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .required(),
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
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
  validateCardBody,
}
