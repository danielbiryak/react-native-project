import { gql } from "@apollo/client";

const LIKE_POST_METHOD = gql`
    mutation likePostMethod($post_id: Int!, $user_id: Int!){
        likePostMethod(post_id: $post_id, user_id:$user_id)
    }
`
export { LIKE_POST_METHOD }