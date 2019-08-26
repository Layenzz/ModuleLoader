let util = require('util')
let mysql = require('mysql')
let config = require('../../config/config.json')

let pool = mysql.createPool({
    host: config.database.host || "localhost",
    database: config.database.database || "moduleLoader",
    user: config.database.username || "moduleLoader",
    password: config.database.password || "moduleLoader"
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()

    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool
