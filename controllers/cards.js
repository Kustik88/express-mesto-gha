const cardModel = require('../models/card')
const {
  OK,
  CREATED,
} = require('../constants/statusCodes')
const { createError } = require('../middlewares/createError')

const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.send(cards))
    .catch(next)
}

const createCard = (req, res, next) => {
  const { name, link } = req.body
  const owner = req.user._id
  cardModel.create({ name, link, owner })
    .then((newCard) => res.status(CREATED).send(newCard))
    .catch(next)
}

const deleteCard = (req, res, next) => {
  cardModel
    .findByIdAndRemove(req.params.cardId)
    .orFail(() => createError('CardNotFoundError', 'Карточка c таким id не найдена'))
    .then((card) => res.send(card))
    .catch(next)
}

const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => createError('CardNotFoundError', 'Карточка c таким id не найдена'))
    .then((card) => res.status(CREATED).send(card))
    .catch(next)
}

const dislikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => createError('CardNotFoundError', 'Карточка c таким id не найдена'))
    .then((card) => res.status(OK).send(card))
    .catch(next)
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
