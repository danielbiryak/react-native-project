import { gql } from "@apollo/client";

const GET_USERS_LIKE_STATE = gql`
  mutation getUsersLikeState($post_id: Int!, $user_id: Int!) {
    getUsersLikeState(post_id: $post_id, user_id: $user_id) 
  }
`
export { GET_USERS_LIKE_STATE }