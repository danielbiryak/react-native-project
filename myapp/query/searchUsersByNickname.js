import { gql } from "@apollo/client";

const SEARCH_USERS_BY_NICKNAME = gql`
    mutation searchUsersByNickname($nickname: String!) {
        searchUsersByNickname(nickname: $nickname){
            id
            name
            nickname
        }
    }
`

export { SEARCH_USERS_BY_NICKNAME }