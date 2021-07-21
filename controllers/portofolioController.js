const { Portofolio } = require('../models')

module.exports = {
    index: (req, res) => {
        Portofolio.findAll({
        }).then(portofolio => {
            res.render('./portofolio/index', {portofolio})
        })
    },
    create: (req, res) => {
        res.render('./portofolio/create')
    },
    doCreate: (async(req, res) => {
        try {
            const {
                title,
                description,
                tags,
                repository,
                image
            } = req.body
    
            const portofolio = await Portofolio.create({
                title,
                description,
                tags,
                repository,
                image
            })
            return res.render('./portofolio/detail', {portofolio})
        }
        catch (err) {
            console.log(err)
            return res.render('./portofolio/create')
        }
    }),
    detail: (req, res) => {
        const portofolioId = req.params.id;

        Portofolio.findOne({ 
            where: { id: portofolioId }
        }).then(portofolio => {
            res.render('./portofolio/detail', {portofolio})
        })
    },
    update: (req, res) => {
        const portofolioId = req.params.id
        
        Portofolio.findOne({ 
            where: { id: portofolioId }
        }).then(portofolio => {
            res.render('./portofolio/update', {portofolio})
        })
    },
    doUpdate: (async(req, res) => {
        try {
            const portofolioId = req.params.id
            const {
                title,
                description,
                tags,
                repository,
                image
            } = req.body
            const query = { where: { id: portofolioId } }
            
            const portofolio = await Portofolio.update({ 
                title: title,
                description: description,
                tags: tags,
                repository: repository,
                image: image
            }, query)
            return res.redirect('/portofolio/' + portofolioId)
        }
        catch (err) {
            console.log(error)
            return res.redirect('/portofolio/update/' + req.params.id)
        }
    }),
    doDelete: (req, res) => {
        const portofolioId = req.params.id

        Portofolio.destroy({
            where: { id: portofolioId }
        }).then(user => {
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