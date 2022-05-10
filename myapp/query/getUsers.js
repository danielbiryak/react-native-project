import {gql} from "@apollo/client"

const GET_USERS = gql`
    query {
        getAllUsers {
            id
            username
            age
            password
        }
    }
`
const GET_USER = gql`
    mutation getUser($username: String!, $password: String!, $age: Int!) {
        getUser(username: $username, password: $password, age: $age) {
            id
            username
            password
            age
        }
    }
`
const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!, $age: Int!) {
        createUser(username: $username, password: $password, age: $age) {
            id
            username
            age
            password
        }
    }

`

export {GET_USERS, GET_USER, CREATE_USER}