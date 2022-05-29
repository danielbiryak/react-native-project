import { gql } from "@apollo/client";

const GET_POST_LIKES_COUNT = gql`
    mutation getPostLikesCount($post_id: Int!) {
        getPostLikesCount(post_id: $post_id)
    }
`

export { GET_POST_LIKES_COUNT }