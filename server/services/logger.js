const bunyan = require('bunyan');
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });


module.exports = {
    getLogger
}
