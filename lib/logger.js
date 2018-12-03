const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const logger = createLogger({
    level: 'info',
    format: combine(timestamp(),json()),
    transports: [
        new transports.File({
            filename: `${appRoot}/logs/error.log`,
            level: 'error'
        }),
        new transports.File({
            filename: `${appRoot}/logs/combined.log`
        })
    ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;