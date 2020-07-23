const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hashCount = require('../utils/hashCount')
const secrets = require('../config/secret')

const Users = require('../users/userModel')

router.post('/register', validateUserRegister, (req, res) =>
{
    let user = req.body
    const hash = bcrypt.hashSync(user.password, hashCount)
    let originalPass = user.password
    user.password = hash
    Users.add(user)
        .then(response => {
            user.id = response
            // user.id = response[0]
            const token = generateToken(user)
            res.status(201).json({ token, id: user.id, email: user.email})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error: Couldn\'t register' })
        })
})

router.post('/login', validateUserLogin, (req, res) => {
    let { email, password } = req.body

    Users.findBy({ email })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ token, id: user.id, email: user.email })
            }
            else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: `Error: could not login` })
        })
})

function generateToken(user) {
    const payload = {
        username: user.username
    }
    const options = {
        expiresIn: '7d'
    }
    
    return jwt.sign(payload, secrets.jwtSecret, options)
}

function validateUserRegister(req, res, next) {
    if (!req.body) res.status(400).json({message: 'missing user data'})
    else if (!req.body.email || !req.body.password || !req.body.political_orientation) {
        res.status(400).json({message: 'email, password, political_orientation required'})
    }
    else next()
}

function validateUserLogin(req, res, next) {
    if (!req.body) res.status(400).json({message: 'missing user data'})
    else if (!req.body.email || !req.body.password) {
        res.status(400).json({message: 'email, password required'})
    }
    else next()
}

module.exports = router