const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type User {
        id: ID!
        username: String!
        password: String!
        age: Int!
        posts: [Post]!
    }
    type Post {
        id: ID
        title: String
        content: String
    }
    
    input UserInput {
        username: String
        password: String
        age: Int
    }
    input PostInput {
        id: ID
        title: String
        content: String
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    
    type Mutation {
        createUser(username: String!, password: String!): User
        userAuth(username: String, password: String): User
    }
`)

module.exports = schema