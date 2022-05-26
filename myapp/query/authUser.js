import {gql} from "@apollo/client"

const AUTH_USER = gql`
    mutation userAuth($nickname: String!, $password: String!) {
        userAuth(nickname: $nickname, password: $password) {
            id
            nickname
        }
    }
`

export {AUTH_USER}