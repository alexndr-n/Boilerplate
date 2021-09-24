const config = require('../config')[process.env.NODE_ENV || 'development'];
const log = config.log();

console.log('db username', process.env.POSTGRES_USER)

module.exports = {
    development: {
        username: "postgres",
        password: "admin",
        database: "dev",
        host: "localhost",
        port: 5432,
        dialect: "postgres",
        logging: msg => log.info(msg)
    },
    test: {
        username: "postgres",
        password: "admin",
        database: "dev",
        host: "database",
        port: 5432,
        dialect: "postgres",
        logging: msg => log.info(msg)
    }, 
    production: {
        username: "postgres",
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: "database",
        port: 5432,
        dialect: "postgres",
        logging: msg => log.info(msg)
    }
}