const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const request = require('request')
const sharp = require('sharp')
const app = express()
app.use(express.json())
/**
 * Download input image
 * @param {string} uri uri - incomming image url
 * @param {string} filename filename - incomming image name
 * @param {*} callback callback - to save output image before sending response
 */
var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type'])
        console.log('content-length:', res.headers['content-length'])
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
    })
}
/**
 * Home Route to check api is running 
 * @name get /
 */
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})
/**
 * Route serving image post and authentication.
 * @name get/api/create
 * @function
 * @inner
 * protected endpoint to return thumbnail sized image for any input image url
 */
app.post('/api/create', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            download(req.body.image, 'input.png', function () {
                /**
                 * Resize image and respond with thumbnail
                 */
                sharp('input.png').resize(50, 50).toBuffer(function (err, buffer) {
                    fs.writeFile('output.png', buffer, function (e) {
                        res.sendfile('output.png')
                    })
                })
            })
            sharp.cache(false)
        }
    })
})
/**
 * Route serving login form.
 * @name get/api/login
 * @function
 * @inner
 * public endpoint to return jwt token for the mock user
 */
app.post('/api/login', (req, res) => {
    /**
     * Mock user
     * @type {{username: string, password: string|number}}
     */
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token,
            user
        })
    })
})
/**
 * middleware to verify the jwt
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers.authorization
    // check if bearer is undifined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        // Next middleware
        next()
    } else {
        // Forbiden
        res.sendStatus(403)
    }
}
module.exports = app
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
