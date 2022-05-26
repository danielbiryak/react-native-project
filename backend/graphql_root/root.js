import {getAllUsers, getUserById, getUsersLimited, getUserByNickPassword } from '../database/query_user/read_query_user'
import {createUser} from '../database/query_user/create_query_user'

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
    userAuth: async ({ nickname, password }) => {
        console.log(nickname)
        console.log(password)
        return await getUserByNickPassword(nickname, password)
    },
    createUser: async ({ nickname, password, name, birthday_date }) => {
        return await createUser(nickname, password, name, birthday_date)
    }
}

export default root