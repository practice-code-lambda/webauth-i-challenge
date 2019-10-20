const express = require('express')
const db = require('./user-model')
const bcrypt = require('bcrypt')
const restricted = require('./restricted-middleware')
const jwt = require('jsonwebtoken')
const secrets = require('../../secrets/secrets')

router = express.Router()

router.get('/', restricted, (req, res) => {

    db.find()
        .then(user => {
            res.status(200).json({ user: user, loggedInUser: req.user.username })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "could not find users"
            })
        })
})

router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 8)

    user.password = hash
    console.log('user', user)
    db.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    db.findBy({ username })
        .first()
        .then(user => {

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ token })
            } else {
                res.status(401).json({ message: "you shall not pass!" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'no credentials provided', error: error })
        })
})

router.get('/single_user', restricted, (req, res) => {
    const username = req.user.username
    db.findBy({ username })
        .first()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "could not find user"
            })
        })
})

router.put('/', restricted, (req, res) => {
    const username = req.user.username
    const user = db.findBy({ username })



    const updatedUser = {
        username: user.username,
        password: user.password,
        phoneNumber: user.phoneNumber,
    }
    if (req.body.password) {
        updatedUser.username = req.body.password
    }
    if (req.body.phoneNumber) {
        updatedUser.phoneNumber
    }

    db.update()
        .then(updatedUser)
})


function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.id
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)

}



module.exports = router