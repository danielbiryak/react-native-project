import pool from "../mysqlPool";

const createUser = async (nickname, password, name, birthday_date) =>
    new Promise((resolve, reject) =>
        pool.getConnection((err, connection) => {
            if (err || !nickname || !password || !name || !birthday_date)
                return reject("Failed to create user")
            connection.query(
                `INSERT INTO user(nickname, password, name, birthday_date) VALUES
                ('${nickname}', '${password}', '${name}','${birthday_date}')`,
                (err, results) => {
                    if (err)
                        return reject(err)
                    resolve({
                        nickname: nickname,
                        password: password,
                        name: name,
                        birthday_date: birthday_date,
                        id: results.insertId
                    })
                }
            ) 
            connection.release()
        })
    )

export { createUser }