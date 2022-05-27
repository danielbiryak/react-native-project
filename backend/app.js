import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import schema from './schema'
import root from './graphql_root/root'
import { getUsersPosts } from './database/query_user_post/read_query_user_post'

// const express = require('express')
// const graphqlHTTP = require('express-graphql').graphqlHTTP
// const cors = require('cors')
// const schema = require('./schema')
// const pool = require('./database/mysqlPool')

const server = express()
server.use(cors())

const users = [
    { id: 1, age: 25, username: 'Sergey', password: 'cringe' },
    { id: 28582813, age: 23, username: 'Dmitriy', password: 'cringe' },
    { id: 28582312, age: 27, username: 'Saveliy', password: 'cringe' },
    { id: 12582312, age: 28, username: 'Felix', password: 'cringe' },
    { id: 18582312, age: 29, username: 'Ban', password: 'cringe' },
]

server.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
}))
const PORT = '3000'

server.get('/', async (req, res) => {
    let response_text = 'This is the main page of backend server'
    const time = 809308800000
    let f = new Date()
    //res.json({ some_text: f.getTime()})
    let t = await getUsersPosts(1)
    
    res.json({obj: f})
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})