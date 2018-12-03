const env = process.env.NODE_ENV || 'development';
const application = require(`./env/${env}/application.json`);
const database = require(`./env/${env}/database.json`);
var settings = {};

Object.assign(settings, {application:application});
Object.assign(settings, {db: database});

settings.db.connectionURL = async (connectionName) => {
    const connection = settings.db[connectionName || 'default'];
    let connString = `${connection.settings.client}://` +
        `${connection.settings.username}:${connection.settings.password}` +
        `@${connection.settings.host}:${connection.settings.port}/` +
        `${connection.settings.database}` +
        `?authSource=${connection.options.authenticationDatabase}`;
    return connString;
}

module.exports = settings;