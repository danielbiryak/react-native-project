import pool from "../mysqlPool"


const getAllUsers = async () =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err)
            connection.query(
                'SELECT * FROM user',
                (err, results) => {
                    if (err)
                        return reject(err)
                    resolve(results)
                }
            )
            connection.release()
        })
    )


const getUserById = async (id) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err)
            connection.query(
                `SELECT * FROM user WHERE id = ${id}`,
                (err, results) => {
                    if (err) return reject(err)
                    resolve(results[0])
                }
            )
            connection.release()
        })
    )

const getUsersLimited = async (limit) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err)
            connection.query(
                `SELECT * FROM user order by rand() LIMIT ${limit}`,
                (err, results) => {
                    if (err) return reject(err)
                    resolve(results)
                }
            )
            connection.release()
        })
    )

const getUserByNickPassword = async (nickname, password) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err)
            connection.query(
                `SELECT * FROM user where 
                nickname='${nickname}' and
                password='${password}'`,
                (err, results) => {
                    console.log(results)
                    if (err) 
                        return reject(err)
                    if (results)
                        resolve(results[0])
                    else
                        resolve(null)
                }
            )
            connection.release()
        })
    )

export { getAllUsers, getUserById, getUsersLimited, getUserByNickPassword }