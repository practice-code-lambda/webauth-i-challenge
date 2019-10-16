const db = require('./dbconfig')

module.exports = {
    find,
    add,
    findBy,

}

function find() {
    console.log('here')
    return db('users')
}
function findBy(username) {
    console.log('model', username)
    return db('users')
        .where(username, 'users.user')

}

function add(user) {
    return db('users').insert(user)
}