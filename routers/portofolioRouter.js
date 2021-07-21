const router = require('express').Router()
const portofolioController = require('../controllers/portofolioController')

router.get('/', portofolioController.index)

router.get('/create', portofolioController.create)
router.post('/create', portofolioController.doCreate)

router.get('/:id', portofolioController.detail)

router.get('/update/:id', portofolioController.update)
router.post('/update/:id', portofolioController.doUpdate)

router.delete('/:id', portofolioController.doDelete)

module.exports = router