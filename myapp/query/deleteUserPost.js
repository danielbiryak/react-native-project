import { gql } from "@apollo/client";

const DELETE_USER_POST = gql`
    mutation deleteUserPost($post_id: Int!) {
        deleteUserPost(post_id: $post_id)
    }
`

export { DELETE_USER_POST }