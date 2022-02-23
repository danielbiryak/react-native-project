const server = require('express')()
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
server.use(cors())
server.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))
const PORT = '3000'

server.get('/', (req, res) => {
    let response_text = 'Chillout  fdfsdsf'

    res.json({some_text: response_text})
})



server.listen(PORT)