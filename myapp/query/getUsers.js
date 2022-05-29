import { gql } from "@apollo/client"

const GET_USERS = gql`
    query {
        getAllUsers {
            id
            nickname
            birthday_date
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
    mutation createUser($user: CreateUserInput){
	    createUser(user: $user){
            id
            nickname
    }  
}

`

export { GET_USERS, GET_USER, CREATE_USER }