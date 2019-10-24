const express = require('express')
const db = require('./user-model')
const bcrypt = require('bcrypt')
const restricted = require('./restricted-middleware')
const jwt = require('jsonwebtoken')
const secrets = require('../../secrets/secrets')

router = express.Router()

//gets all users

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

//registers a new user

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
// logs a registered user in
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

// captures a single logged in user
router.get('/single_user', restricted, (req, res) => {
    const username = req.user.username
    db.findBy({ username })
        .first()
        .then(user => {
            res.status(200).json({ userID: user.id })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "could not find user"
            })
        })
})

// updates currently logged in user
router.put('/', restricted, (req, res) => {
    const updatedUser = req.body
    const hash = bcrypt.hashSync(req.body.password, 8)

    updatedUser.password = hash
    const id = req.user.id
    db.update(updatedUser, id)
        .then(updatedUser => {
            res.status(200).json(updatedUser)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "could not update user"
            })
        })
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