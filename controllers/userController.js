const { User } = require('../models')

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
    update: (req, res) => {},
    doUpdate: (req, res) => {},
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