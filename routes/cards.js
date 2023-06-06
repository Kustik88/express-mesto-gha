const router = require('express').Router()
const auth = require('../middlewares/auth')
const cardsControllers = require('../controllers/cards')
const { validateCardBody, validateCardBodyForPost } = require('../middlewares/validate')

router.use(auth)
router.get('/cards', cardsControllers.getCards)
router.post('/cards', validateCardBodyForPost, cardsControllers.createCard)
router.delete('/cards/:cardId', validateCardBody, cardsControllers.deleteCard)
router.put('/cards/:cardId/likes', validateCardBody, cardsControllers.likeCard)
router.delete('/cards/:cardId/likes', validateCardBody, cardsControllers.dislikeCard)

module.exports = router
