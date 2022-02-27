exports.up = function (knex) {
    return knex.schema
        .createTable('users', table => {
            table.string('id', 20)
            table.string('username', 30)
            table.string('password', 30)
            table.integer('age', 3)
        })
        .createTable('posts', table => {
            table.increments('id')
            table.string('user_id', 20)
            table.string('title', 50)
            table.text('content')
        })
};

exports.down = function (knex) {
    return knex
        .dropTableIfExists('users')
        .dropTableIfExists('posts')
};
