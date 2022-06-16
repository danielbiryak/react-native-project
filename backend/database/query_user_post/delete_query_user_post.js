import pool from "../mysqlPool"

const deleteUserPost = async (post_id) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err) return reject(err)
            connection.query(
                `delete from post_likes where post_id = ${post_id}`,
                (err, results) => {
                    if (err) return reject("Post can't be deleted")
                    connection.query(
                        `delete from user_post where id = ${post_id}`,
                        (_err, _results) => {
                            if (err) return reject("Post can't be deleted")
                            resolve("Post have been deleted")
                        }
                    )
                }
            )
            connection.release()
        })
    )

export { deleteUserPost }