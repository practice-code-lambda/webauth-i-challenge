const express = require('express')
const helmet = require('helmet')
// const cors = require('cors')
const userRouter = require('./routers/userRouter')
// const session = require('express-session')

server = express()

console.log('enviornment:', process.env.NODE_ENV)
server.use(helmet())
// server.use(cors())
server.use(express.json())


server.use('/api', userRouter)

module.exports = server;







// const sessionConfig = {
//     name: "chocochip",
//     secret: process.env.Secret || 'keep it secret, keep it safe',
//     cookie: {
//         maxAge: 1000 * 60 * 60,
//         secure: false, // true means only send over https
//         httpOnly: true,

//     },
//     resave: false,
//     saveUninitialized: true,
// }



// server.use(session(sessionConfig))


