const routes = require('express').Router();
const controllers = require('./controllers');

routes.route('/auth/local')
        .post(controllers.login);

routes.route('/auth/local/register')
        .post(controllers.register);

module.exports = routes;