module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './database/client_database.db3'
        },
        useNullAsDefault: true
    }
}