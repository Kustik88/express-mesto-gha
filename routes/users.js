const router = require('express').Router()
const auth = require('../middlewares/auth')
const userControllers = require('../controllers/users')
const { validateUserBody, validateUserParams, validateUserBodyForAuth } = require('../middlewares/validate')

router.post('/signup', validateUserBodyForAuth, userControllers.createUser)
router.post('/signin', validateUserBodyForAuth, userControllers.loginUser)

router.use(auth)

router.get('/users', userControllers.getUsers)
router.get('/users/:userId', validateUserParams, userControllers.getUserById)
router.get('/users/me', userControllers.getUserById)
router.patch('/users/me', validateUserBody, userControllers.editUserInfo)
router.patch('/users/me/avatar', validateUserBody, userControllers.editUserAvatar)

module.exports = router
