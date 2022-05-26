import pool from "../mysqlPool"

const getAllUsersPosts = async (id) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err)
            connection.query(
                `SELECT * FROM user_post where `,
                (err, results) => {
                    if (err)
                        return reject(err)
                    resolve(results)
                }
            )
            connection.release()
        })
    )