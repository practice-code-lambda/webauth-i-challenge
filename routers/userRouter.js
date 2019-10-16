const express = require('express')
const db = require('../user-model.js')
const bcrypt = require('bcrypt')
const restricted = require('./restricted-middleware')
const jwt = require('jsonwebtoken')

router = express.Router()

router.get('/', restricted, (req, res) => {
    db.find()
        .then(user => {
            res.json(user)
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
            const token = generateToken(user)
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: "welcome" })
            } else {
                res.status(401).json({ message: "you shall not pass!" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: error })
        })
})

function generateToken() {
    return jwt.sign(payload, secret, options)
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