const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.index)
router.get('/update/:id', userController.update)
router.post('/update/:id', userController.doUpdate)
router.delete('/delete/:id', userController.doDelete)

module.exports = router