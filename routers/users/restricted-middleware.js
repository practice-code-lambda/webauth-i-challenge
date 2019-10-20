const jwt = require('jsonwebtoken')
const secrets = require('../../secrets/secrets')

module.exports = function (req, res, next) {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "invalid credentials" })
            } else {
                // can return user

                req.user = { username: decoded.username, id: decoded.id }

                console.log("req.user in middleware", decoded)
                //this is how you link tables in every request
                next()
            }
        })

    } else {
        res.status(400).json({ message: 'no credentials' })
    }
}





// for cookies
// module.exports = function (req, res, next) {

//     if (req.session && req.session.user) {
//         next()
//     } else {
//         res.status(401).json({ message: 'you shall not pass!' })
//     }
// }