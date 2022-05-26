import mysql from 'mysql2'
//const mysql = require('mysql2')

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'mysql',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'social_net_db',
})

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const CREATE_USER_TABLE_SQL = `CREATE TABLE IF NOT EXISTS user (
	id INT NOT NULL AUTO_INCREMENT,
	nickname VARCHAR(20) NOT NULL,
  password VARCHAR(30) NOT NULL,
	name VARCHAR(30) NOT NULL,
	birthday_date VARCHAR(15) NOT NULL,
	PRIMARY KEY (id,nickname)
)`

const CREATE_USER_POST_TABLE_SQL = `CREATE TABLE IF NOT EXISTS user_post (
	id INT NOT NULL AUTO_INCREMENT,
	owner_id INT NOT NULL,
	text_content TEXT NOT NULL,
	PRIMARY KEY (id)
)`

const CREATE_POST_LIKES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS post_likes (
	user_id INT NOT NULL,
	post_id INT NOT NULL
)`


pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    connection.query(CREATE_USER_TABLE_SQL, (err) => {
      if (!err) {
        console.log('Users table was created')
      }
    })
    connection.query(CREATE_USER_POST_TABLE_SQL, (err) => {
      if (!err) {
        console.log('Users post table was created')
      }
    })
    connection.query(CREATE_POST_LIKES_TABLE_SQL, (err) => {
      if (!err) {
        console.log('Post likes table was created')
      }
    })

    connection.release()
  }
})

// module.exports = pool
export default pool