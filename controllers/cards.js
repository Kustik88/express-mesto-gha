const cardModel = require('../models/card')
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../constants/statusCodes')

const getCards = (req, res) => {
  cardModel.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

const createCard = (req, res) => {
  const { name, link } = req.body
  const owner = req.user._id
  cardModel.create({ name, link, owner })
    // .orFail(() => {
    //   throw new Error('NotFound')
    // })
    .then((newCard) => res.status(CREATED).send(newCard))
    .catch((err) => {
      if (err.message === 'NotFound' || err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Пользователь c таким id не найден',
        })
        return
      }
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((e) => e.message).join(' ')}` })
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

const deleteCard = (req, res) => {
  cardModel
    .findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound')
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({
          message: 'Карточка c таким id не найдена',
        })
        return
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Введены некорректные данные',
        })
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

const likeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new Error('NotFound')
    })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({
          message: 'Карточка c таким id не найдена',
        })
        return
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Введены неккоректные данные' })
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

const dislikeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new Error('NotFound')
    })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NOT_FOUND).send({
          message: 'Карточка c таким id не найдена',
        })
        return
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Введены неккоректные данные' })
        return
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
    })
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
