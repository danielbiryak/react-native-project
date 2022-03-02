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

export {GET_USERS}