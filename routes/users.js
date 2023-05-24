const router = require('express').Router()
const userControllers = require('../controllers/users')

router.get('/users', userControllers.getUsers)
router.get('/users/:userId', userControllers.getUserById)
router.post('/users', userControllers.createUser)
router.patch('/users/me', userControllers.editUserInfo)
router.patch('/users/me/avatar', userControllers.editUserAvatar)

module.exports = router
