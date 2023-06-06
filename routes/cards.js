const router = require('express').Router()
const auth = require('../middlewares/auth')
const cardsControllers = require('../controllers/cards')
const { validateCardBodyForPost, validateCardParams } = require('../middlewares/validate')

router.use(auth)
router.get('/cards', cardsControllers.getCards)
router.post('/cards', validateCardBodyForPost, cardsControllers.createCard)
router.delete('/cards/:cardId', validateCardParams, cardsControllers.deleteCard)
router.put('/cards/:cardId/likes', validateCardParams, cardsControllers.likeCard)
router.delete('/cards/:cardId/likes', validateCardParams, cardsControllers.dislikeCard)

module.exports = router
