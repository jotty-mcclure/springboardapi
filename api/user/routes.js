const routes = require('express').Router();
const controllers = require('./controllers');

routes.route('/users')
        .get(controllers.find)
        .post(controllers.create);

routes.route('/users/:id')
        .get(controllers.findOne)
        .put(controllers.update)
        .delete(controllers.delete);

module.exports = routes;