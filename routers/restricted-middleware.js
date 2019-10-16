const bcrypt = require('bcrypt')

module.exports = function (req, res, next) {

    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({ message: 'you shall not pass!' })
    }


}

// module.exports = function (req, res, next) {
//     const { user, password } = req.headers

//     db.findBy({ user }) //<-------------------- what is dis
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