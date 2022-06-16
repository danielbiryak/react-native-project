import pool from "../mysqlPool"

const likePostMethod = async (post_id, user_id) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err)
            connection.query(
                `SELECT * from post_likes where user_id = ${user_id} and post_id = ${post_id}`,
                (err, results) => {
                    if (err) return reject(err)
                    if (results[0] == null) {
                        connection.query(
                            `INSERT into post_likes(post_id, user_id) values(${post_id},${user_id})`,
                            (_err, _results) => {
                                if (err) return reject(err)
                                resolve(true)
                            }
                        )
                    } else {
                        connection.query(
                            `DELETE from post_likes where post_id = ${post_id} and user_id = ${user_id}`,
                            (err, results) => {
                                if (err) return reject(err)
                                resolve(false)
                            }
                        )
                    }
                }
            )
            connection.release()
        })
    )

const createUserPost = async (owner_id, title, text_content) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err) return reject(err)
            connection.query(
                `INSERT INTO user_post (owner_id, title, text_content)
                VALUES ('${owner_id}', '${title}', '${text_content}')`,
                (err, results) => {
                    if (err) return reject(err)
                    resolve("Post have created")
                }
            )
            connection.release()
        })
    )

export { likePostMethod, createUserPost }