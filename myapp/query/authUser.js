import {gql} from "@apollo/client"

const AUTH_USER = gql`
    mutation userAuth($user: UserAuthInput) {
        userAuth(user: $user) {
            id
            nickname
        }
    }
`

export {AUTH_USER}