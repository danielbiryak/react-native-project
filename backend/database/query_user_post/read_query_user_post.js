import pool from "../mysqlPool"

const getUsersPosts = async (id) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err) return reject(err)
            connection.query(
                `SELECT * FROM user_post where owner_id = ${id}`,
                (err, query_results) => {
                    if (err) return reject(err)
                    let ids = query_results.map((item) => {
                        return item.id
                    })
                    let res_list = []
                    ids.map((item, i) => {
                        connection.query(
                            `SELECT count(*) as 'likes_count' FROM post_likes where post_id = ${item}`,
                            (_err, _results) => {
                                if (_err) return reject(_err)

                                res_list.push(Object.assign({}, { id: item, likes_count: _results[0].likes_count }, query_results[i]))

                                if (i === ids.length - 1)
                                    resolve(res_list)
                            }
                        )
                    })

                }
            )
            connection.release()
        })
    )

export { getUsersPosts }