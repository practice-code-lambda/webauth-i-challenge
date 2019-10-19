const db = require('./dbconfig')

module.exports = {
    findPlantsByUser,
    find,
    add,
    findBy,
    update,
    remove,

}

function find() {
    return db('plants')

}

function findPlantsByUser(id) {

    return db('plants')
        .join('users', 'users.id', 'plants.user_id')
        .where('user_id', id)
}



function findBy(nickname) {
    return db('plants')
        .where(nickname, 'plants.nickname')

}

function add(plant) {

    return db('plants').insert(plant)
}



function remove(id) {
    return (
        db('plants')
            .where('plants.id', id)
            .del()
    )
}

function update(changes, id) {
    return (
        db('plants')
            .where('plants.id', id)
            .update(changes)
    )
}