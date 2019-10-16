const express = require('express')
const db = require('../user-model.js')
const bcrypt = require('bcrypt')
const restricted = require('./restricted-middleware')
const jwt = require('jsonwebtoken')
const secrets = require('../secrets/secrets')

router = express.Router()

router.get('/', (req, res) => {
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
    console.log(user)
    const hash = bcrypt.hashSync(user.password, 8)

    user.password = hash

    db.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { user, password } = req.body

    db.findBy({ user })
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

function generateToken(user) {
    const payload = {
        username: user.username
    }
    // const secret = "keep it secret, keep it safe!"
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)

}

//create middleware
// function restricted(req, res, next) {
//     const { user, password } = req.headers

//     db.findBy({ user })
//         .first()
//         .then(user => {
//             if (user && bcrypt.compareSync(password, user.password)) {
//                 next()
//             } else {
//                 res.status(401).json({ message: "you shall not pass!" })
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ error: error })
//         })


// }

module.exports = router