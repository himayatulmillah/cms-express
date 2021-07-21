const router = require('express').Router()
const authController = require('../controllers/authController')

router.get('/register', authController.register)
router.post('/register', authController.doRegister)

router.get('/login', authController.login)
router.post('/login', authController.doLogin)

router.get('/logout', authController.doLogout)

module.exports = router