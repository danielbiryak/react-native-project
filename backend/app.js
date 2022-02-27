const server = require('express')()
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
server.use(cors())
const users = [
    {id: 28382813, age: 25, username: 'Sergey', password: 'cringe'}
]
const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id === id)
    },
    createUser: ({input}) => {
        const id = Date.now()
        const user = {id: id, ...input}
        users.push(user)
        return user
    }
}

server.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))
const PORT = '3000'

server.get('/', (req, res) => {
    let response_text = 'Chillout fdfsdsf'

    res.json({some_text: response_text})
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})