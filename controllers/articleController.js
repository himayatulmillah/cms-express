const { Articles } = require('../models')

module.exports = {
    index: (req, res) => {
        Articles.findAll({
        }).then(article => {
            res.render('./articles/index', {article})
        })
    },
    create: (req, res) => {
        res.render('./articles/create')
    },
    doCreate: (async(req, res) => {
        try {
            const {
                title,
                body,
                approved
            } = req.body
    
            const article = await Articles.create({
                title,
                body,
                approved,
            })
            return res.render('./articles/detail', {article})
        }
        catch (err) {
            console.log(err)
            return res.render('./articles/create')
        }
    }),
    detail: (req, res) => {
        const articleId = req.params.id;

        Articles.findOne({ 
            where: { id: articleId }
        }).then(article => {
            res.render('./articles/detail', {article})
        })
    },
    update: (req, res) => {
        const articleId = req.params.id
        
        Articles.findOne({ 
            where: { id: articleId }
        }).then(article => {
            res.render('./articles/update', {article})
        })
    },
    doUpdate: (async(req, res) => {
        try {
            const articleId = req.params.id
            const {
                title,
                body,
                approved
            } = req.body
            const query = { where: { id: articleId } }
            
            const article = await Articles.update({ 
                title: title,
                body: body,
                approved: approved
            }, query)
            return res.redirect('/article/' + articleId)
        }
        catch (err) {
            console.log(error)
            return res.redirect('/article/update/' + req.params.id)
        }
    }),
    doDelete: (req, res) => {
        const articleId = req.params.id

        Articles.destroy({
            where: { id: articleId } 
        }).then(article => {
            res.json({
                'status': 200,
                'message': 'data berhasil dihapus!'
            })
        }).catch(err => {
            res.json({
                'status': 400,
                'message': 'gagal menghapus data'
            })
        })
    },
}