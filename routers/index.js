const router = require('express').Router()
const homeRouter = require('./homeRouter')
const authRouter = require('./autRouter')
const portofolioRouter = require('./portofolioRouter')
const articleRouter = require('./articleRouter')
const userRouter = require('./userRouter')
const restrict = require('../middlewares/restrict')

router.use('/', homeRouter)
router.use('/', authRouter)
router.use('/portofolio', restrict, portofolioRouter)
router.use('/article', restrict, articleRouter)
router.use('/user', restrict, userRouter)

module.exports = router