const router = require('express').Router()
const cardsControllers = require('../controllers/cards')

router.get('/cards', cardsControllers.getCards)
router.post('/cards', cardsControllers.createCard)
router.delete('/cards/:cardId', cardsControllers.deleteCard)

module.exports = router
