const { User } = require('../models')
const bycrpt = require('bcrypt')

function format (user) {
    const { id, username } = user
    return {
        id,
        username,
        accessToken: jwt.generateToken({id, username})
    }
} 

module.exports = {
    index: (req, res) => {
        User.findAll({
        }).then(user => {
            res.render('./users/index', {user})
        })
    },
    update: (req, res) => {
        const userId = req.params.id
        
        User.findOne({ 
            where: { id: userId }
        }).then(user => {
            res.render('./users/update', {user})
        })
    },
    doUpdate: (req, res) => {
        const userId = req.params.id
        const {username, password} = req.body
        const encryptedPassword = bycrpt.hashSync(password, 10)
        const query = { where: { id: userId } }
        User.update({
            username,
            password: encryptedPassword
        }, query).then(user => {
            return res.redirect('/user')
        }).catch(err => {
            return res.redirect('/user/update/' + userId)
        }) 
    },
    doDelete: (req, res) => {
        const userId = req.params.id

        User.destroy({
            where: { id: userId } 
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