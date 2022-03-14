import {gql} from "@apollo/client"

const AUTH_USER = gql`
    mutation userAuth($username: String!, $password: String!) {
        userAuth(username: $username, password: $password) {
            id
            username
        }
    }
`

export {AUTH_USER}