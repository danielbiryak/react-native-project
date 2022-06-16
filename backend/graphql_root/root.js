import {getAllUsers, getUserById, getUsersLimited, getUserByNickPassword, searchUsersByNickname } from '../database/query_user/read_query_user'
import {createUser} from '../database/query_user/create_query_user'
import { getPostLikesCount, getUsersLikeState, getUsersPosts } from '../database/query_user_post/read_query_user_post'
import { createUserPost, likePostMethod } from '../database/query_user_post/create_query_user_post'
import { deleteUserPost } from '../database/query_user_post/delete_query_user_post'

const root = {
    /**
     * 
     * @returns All users in DataBase
     */
    getAllUsers: async () => {
        return await getAllUsers()
    },


    /**
     * @param {id} int
     * @returns user by his Id (for work in already auth mode)
     */
    getUserById: async ({id}) => {
        return await getUserById(id)
    },


    /**
     * @param {limit} int 
     * @returns users that have joined in borders of limit (for dynamic recommend system)
     */
    getUsersLimited: async({limit}) =>{
        return await getUsersLimited(limit)
    },

    /**
     * 
     * @param {nickname} str 
     * @param {password} str 
     * @returns if user is auth it returns user, else null
     */
    userAuth: async ({user}) => {
        console.log(JSON.stringify(user))

        return await getUserByNickPassword(user.nickname,user.password)
    },
    createUser: async ({ user }) => {
        return await createUser(user.nickname, user.password, user.name, user.birthday_date)
    },

    getUsersPosts: async ({id}) => {
        return await getUsersPosts(id)
    },

    getUsersLikeState: async({post_id, user_id}) => {
        return await getUsersLikeState(post_id, user_id)
    },

    likePostMethod: async({post_id, user_id})=> {
        return await likePostMethod(post_id, user_id)
    },

    getPostLikesCount: async({post_id}) => {
        return await getPostLikesCount(post_id)
    },

    searchUsersByNickname: async({nickname}) => {
        return await searchUsersByNickname(nickname)
    },

    createUserPost: async({owner_id, title, text_content}) => {
        return await createUserPost(owner_id, title, text_content)
    },

    deleteUserPost: async({post_id}) => {
        return await deleteUserPost(post_id)
    }
}

export default root