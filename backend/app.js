import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import schema from './schema'
import pool from './database/mysqlPool'

const server = express()
server.use(cors())

const users = [
    { id: 1, age: 25, username: 'Sergey', password: 'cringe' },
    { id: 28582813, age: 23, username: 'Dmitriy', password: 'cringe' },
    { id: 28582312, age: 27, username: 'Saveliy', password: 'cringe' },
    { id: 12582312, age: 28, username: 'Felix', password: 'cringe' },
    { id: 18582312, age: 29, username: 'Ban', password: 'cringe' },
]
const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({ username }) => {
        const t = users.find(user => user.username == username)
        console.log(t)
        return t
    },
    userAuth: ({ username, password }) => {
        const user = users.find(s => s.username == username)
        if (user && user.password == password)
            return {
                id: user.id,
                username: user.username
            }
        else
            return null
    },
    createUser: ({ username, password, age }) => {
        const id = Date.now()
        const verify_user = users.find(user => user.username == username)
        if (!verify_user) {
            const user = { id: id, username: username, password: password, age: age }
            users.push(user)
            return user
        } else
            return null
    }
}

server.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))
const PORT = '3000'

server.get('/', (req, res) => {
    let response_text = 'This is the main page of backend server'
 
    const readRecords = () =>
        new Promise((resolve, reject) =>
            pool.getConnection((err, connection) => {
                if (err)
                    return reject(err)
                connection.query(
                    'SELECT * FROM `user`',
                    (err, results) => {
                        if (err) return reject(err)
                        resolve(results)
                    }
                )
                connection.release()
            })
        )


    res.json({ some_text: readRecords })
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})