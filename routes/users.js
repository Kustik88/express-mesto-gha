const router = require('express').Router()
const auth = require('../middlewares/auth')
const userControllers = require('../controllers/users')
const { validateUserBody, validateUserParams, validateUserBodyForAuth } = require('../middlewares/validate')

router.use(validateUserBody)

router.post('/signup', validateUserBodyForAuth, userControllers.createUser)
router.post('/signin', validateUserBodyForAuth, userControllers.loginUser)

router.use(auth)

router.get('/users', userControllers.getUsers)
router.get('/users/:userId', validateUserParams, userControllers.getUserById)
router.get('/users/me', userControllers.getCurrentUser)
router.patch('/users/me', userControllers.editUserInfo)
router.patch('/users/me/avatar', userControllers.editUserAvatar)

module.exports = router
