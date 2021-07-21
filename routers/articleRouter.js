const router = require('express').Router()
const articleController = require('../controllers/articleController')

router.get('/', articleController.index)

router.get('/create', articleController.create)
router.post('/create', articleController.doCreate)

router.get('/:id', articleController.detail)

router.get('/update/:id', articleController.update)
router.post('/update/:id', articleController.doUpdate)

router.delete('/:id', articleController.doDelete)

module.exports = router