//const {buildSchema} = require('graphql')
import {buildSchema} from 'graphql'

const schema = buildSchema(`
    type User {
        id: ID!
        nickname: String!
        password: String!
        name: String!
        birthday_date: String!
        posts: [Post]!
    }
    type Post {
        id: ID
        likes_count: Int
        owner_id: String
        title: String
        text_content: String
    }
    
    input UserInput {
        nickname: String
        password: String
        age: Int
    }
    input PostInput {
        id: ID
        owner_id: Int
        title: String
        content: String
    }
    
    type Query {
        getAllUsers: [User]
    }
 
    type Mutation {
        createUser(nickname: String!, password: String!, name: String!, birthday_date: String!): User
        userAuth(nickname: String, password: String): User
        getUserById(id: Int!): User
        getUsersLimited(limit: Int!): [User]
        getUsersPosts(id: Int!): [Post]
    }
`)



//module.exports = schema
export default schema