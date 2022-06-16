import { gql } from "@apollo/client";

const CREATE_USER_POST = gql`
    mutation getUsersPosts($owner_id: Int!, $title: String!, $text_content: String!) {
        createUserPost(owner_id: $owner_id, title: $title,text_content: $text_content)
    }`

export { CREATE_USER_POST }