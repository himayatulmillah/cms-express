const { User } = require('../models')
const bycrpt = require('bcrypt')
const passport = require('passport')
const jwt = require('../lib/jwt')

function format (user) {
    const { id, username } = user
    return {
        id,
        username,
        accessToken: jwt.generateToken({id, username})
    }
} 

module.exports = {
    register: (req, res) => {
        res.render('./users/register')
    },
    doRegister: (async(req, res) => {
        try {
            const {username, password} = req.body
            const encryptedPassword = bycrpt.hashSync(password, 10)
            const user = await User.create({
                username,
                password: encryptedPassword
            })
            return res.redirect('/login')
        }
        catch (err) {
            console.log(err)
            return res.redirect('/register')
        }
    }),
    login: (req, res) => {
        res.render('./users/login')
    },
    doLogin: (async(req, res) => {
        try {
            const {username, password} = req.body

            const user = await User.findOne({ where: {username: username} })
            if (!user) return console.log('user not found')

            const isPasswordValid = bycrpt.compareSync(password, user.password)
            if (!isPasswordValid) return console.log('password invalid')

            const userLogin = format(user)
            res.cookie('token', userLogin.accessToken, {httpOnly: true})
            res.cookie('username', userLogin.username)
            res.cookie('id', userLogin.id)
            // return res.json(userLogin)
            return res.redirect('/portofolio')
        }
        catch (err) {
            return console.log(err)
        }
    }),
    doLogout: (async(req, res) => {
        try {
            res.clearCookie('token')
            return res.redirect('/login')
        }
        catch (err) {
            console.log(err)
            return res.redirect('/')
        }
    }),
}