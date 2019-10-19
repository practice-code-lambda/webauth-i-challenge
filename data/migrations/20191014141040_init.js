
exports.up = function (knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments()
        tbl.string("username", 255).notNullable().unique()
        tbl.string("password", 255).notNullable().unique()
        tbl.string("phoneNumber", 255)

    })
        .createTable("plants", tbl => {
            tbl.increments()
            tbl.string("nickname", 128).notNullable()
            tbl.string("species", 255).notNullable()
            tbl.string("h2oFrequency", 255).notNullable()
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
}
exports.down = function (knex) {
    return knex.schema

        .dropTableIfExists("plants")
        .dropTableIfExists("users")


}
