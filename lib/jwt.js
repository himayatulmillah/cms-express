const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = {
    generateToken: ({id, username}) => {
        const payload = { id: id, username: username }
        const secretOrKey = process.env.SECRET_KEY
        const token = jwt.sign(payload, secretOrKey)
        return token
    }
}