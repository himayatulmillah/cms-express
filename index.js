const express = require('express')
const cookieParser = require('cookie-parser')
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const app = express()
const port = 3000

app.use('/public', express.static(process.cwd() + '/public'));

const favicon = require('serve-favicon')
const path = require('path')
app.use(favicon(path.join(__dirname, 'public', 'img', 'icon.ico')))

app.use(cookieParser())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const passport = require('./lib/passport')
app.use(passport.initialize())

app.set('view engine', 'ejs')

const router = require('./routers')
app.use(router)

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))