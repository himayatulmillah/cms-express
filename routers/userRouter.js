const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.index)
router.get('/edit/:id')
router.delete('/delete/:id', userController.doDelete)

module.exports = router