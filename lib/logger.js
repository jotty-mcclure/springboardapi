const fs = require('fs');
const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;
const logsDir = `${appRoot}/logs`;

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const logger = createLogger({
    level: 'info',
    format: combine(timestamp(),json()),
    transports: [
        new transports.File({
            filename: `${logsDir}/error.log`,
            level: 'error'
        }),
        new transports.File({
            filename: `${logsDir}/combined.log`
        })
    ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;