const db = require('./dbconfig')

module.exports = {
    find,
    add,
    findBy,
    update,
    remove,

}

function find() {
    console.log('here')
    return db('users')
}
function findBy(username) {
    console.log('model', username.username)
    return db('users')
        .where('users.username', username.username)

}

function add(user) {
    return db('users').insert(user)
}

function update(changes, id) {
    return (
        db('users')
            .where('users.id', id)
            .update(changes)
    )
}

function remove(id) {
    return (
        db('users')
            .where('users.id', id)
            .del()
    )
}