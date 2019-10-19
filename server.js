const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./routers/users/userRouter')
const plantRouter = require('./routers/plants/plantsRouter')

server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())


server.use('/api/user', userRouter)
server.use('/api/plants', plantRouter)

module.exports = server;













