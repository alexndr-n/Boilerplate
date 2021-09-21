const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())

module.exports = (config) => {

  const log = config.log();

  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }
  
  app.use('/', require('./routes'));
  
  // Log out the error to the console
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });

  return app;
};