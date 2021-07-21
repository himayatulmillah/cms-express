const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: ({id, username}) => {
        const payload = { id: id, username: username }
        const secretOrKey = 'BelajarPassportJWT'
        const token = jwt.sign(payload, secretOrKey)
        return token
    }
}