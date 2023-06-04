const router = require('express').Router()
const auth = require('../middlewares/auth')
const userControllers = require('../controllers/users')
const { validateUserBody } = require('../middlewares/validate')

router.use(validateUserBody)

router.post('/signup', userControllers.createUser)
router.post('/signin', userControllers.loginUser)

router.use(auth)

router.get('/users', userControllers.getUsers)
router.get('/users/:userId', userControllers.getUserById)
router.get('/users/me', userControllers.getCurrentUser)
router.patch('/users/me', userControllers.editUserInfo)
router.patch('/users/me/avatar', userControllers.editUserAvatar)

module.exports = router
