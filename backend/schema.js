import { buildSchema } from 'graphql'

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
    input CreateUserInput {
        nickname: String!
        password: String!
        name: String!
        birthday_date: String!
    }
    input UserAuthInput {
        nickname: String
        password: String
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
        createUser(user: CreateUserInput): User
        userAuth(user: UserAuthInput): User
        getUserById(id: Int!): User
        getUsersLimited(limit: Int!): [User]
        getUsersPosts(id: Int!): [Post]
        getUsersLikeState(post_id: Int!, user_id: Int!): Boolean
        likePostMethod(post_id: Int!, user_id: Int!): Boolean
        getPostLikesCount(post_id: Int!): Int
    }
`)

export default schema