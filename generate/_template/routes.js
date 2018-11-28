const routes = require('express').Router();
const controllers = require('./controllers');

routes.route('/{{plural_url}}')
        .get(controllers.find)
        .post(controllers.create);

routes.route('/{{plural_url}}/:id')
        .get(controllers.findOne)
        .put(controllers.update)
        .delete(controllers.delete);

module.exports = routes;