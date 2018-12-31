const env = process.env.NODE_ENV || 'development';
const application = require(`./env/${env}/application.json`);
const database = require(`./env/${env}/database.json`);
var settings = {};

Object.assign(settings, {application:application});
Object.assign(settings, {db: database});

settings.db.connectionURL = async (connectionName) => {
    const connection = settings.db[connectionName || 'default'];
    let connString = `${connection.settings.client || 'mongodb'}://` +
        `${process.env.DATABASE_USERNAME ||connection.settings.username}:`+
        `${process.env.DATABASE_PASSWORD ||connection.settings.password}@` +
        `${process.env.DATABASE_HOST || connection.settings.host || '127.0.0.1'}:` +
        `${process.env.DATABASE_PORT ||connection.settings.port || '27017'}/` +
        `${process.env.DATABASE_NAME || connection.settings.database}` +
        `?authSource=${process.env.DATABASE_AUTHSOURCE || connection.options.authenticationDatabase || 'admin'}`;
    return connString;
}

module.exports = settings;