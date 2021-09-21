const http = require('http');
const Sequelize = require('sequelize')

const config = require('../config')[process.env.NODE_ENV || 'development'];
const db_config = require('../config/database')[process.env.NODE_ENV || 'development'];

const log = config.log();
const app = require('../app')(config);

async function connectToPostgres(){
  const sequelize = new Sequelize(db_config);
  try {
    await sequelize.authenticate()
    log.info("Connection has been established successfully")
    return sequelize
  } catch (error) {
    log.error("Unable to connect to database", error)
  }
}

db_config.client = connectToPostgres()

const server = http.createServer(app);

server.listen(process.env.PORT || 3001);

server.on('listening', () => {
  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.`,
  );
});