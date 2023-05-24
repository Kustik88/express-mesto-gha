const router = require('express').Router()
const userControllers = require('../controllers/users')

router.get('/users', userControllers.getUsers)
router.get('/users/:id', userControllers.getUserById)
router.post('/users', userControllers.createUser)

module.exports = router
