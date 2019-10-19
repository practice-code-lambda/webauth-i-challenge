const db = require('./dbconfig')

module.exports = {
    find,
    add,
    findBy,
    update,
    remove,

}

function find() {
    return db('users')
}
function findBy(username) {
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