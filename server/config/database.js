const config = require('../config')[process.env.NODE_ENV || 'development'];
const log = config.log();

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
        dialect: "postgres"
    },
    production: {
        username: "postgres",
        password: "admin",
        database: "dev",
        host: "database",
        port: 5432,
        dialect: "postgres"
    }
}