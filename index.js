const server = require('./server')

const PORT = process.env.PORT || 7005

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})