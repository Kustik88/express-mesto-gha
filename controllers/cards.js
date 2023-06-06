const cardModel = require('../models/card')
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../constants/statusCodes')

const ExistingEmailError = require('../errors/ExistingEmailError')
const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForBiddenError')
const UnauthorizedError = require('../errors/UnauthorizedError')
const { createError } = require('../helpers/createError')

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
    .orFail(() => { throw new NotFoundError('Карточка c таким id не найден') })
    .then((card) => {
      if (card.owner.toString() !== req.body.user._id) {
        throw new ForbiddenError('Вы не являетесь владельцем карточки')
      }
      res.send(card)
    })
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
    .orFail(() => { throw new NotFoundError('Карточка c таким id не найден') })
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
    .orFail(() => { throw new NotFoundError('Карточка c таким id не найден') })
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
