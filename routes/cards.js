const router = require('express').Router()
const auth = require('../middlewares/auth')
const cardsControllers = require('../controllers/cards')
const { validateCardBody } = require('../middlewares/validate')

router.use(validateCardBody)
router.use(auth)
router.use(validateCardBody)
router.get('/cards', cardsControllers.getCards)
router.post('/cards', cardsControllers.createCard)
router.delete('/cards/:cardId', cardsControllers.deleteCard)
router.put('/cards/:cardId/likes', cardsControllers.likeCard)
router.delete('/cards/:cardId/likes', cardsControllers.dislikeCard)

module.exports = router
