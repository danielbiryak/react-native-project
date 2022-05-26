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
    mutation createUser($nickname: String!, $name: String!, $password: String!, $birthday_date: String!){
	    createUser(nickname: $nickname, name: $name, password:$password, birthday_date: $birthday_date){
            id
            nickname
    }  
}

`

export { GET_USERS, GET_USER, CREATE_USER }