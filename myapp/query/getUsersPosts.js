import { gql } from "@apollo/client";

const GET_USERS_POSTS = gql`
    mutation getUsersPosts($id: Int!){
            getUsersPosts(id: $id){
            id
            owner_id
            text_content
            likes_count
            title
        }  
    }
`

export { GET_USERS_POSTS }