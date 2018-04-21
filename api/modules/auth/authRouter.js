var routes = require('express').Router(),
	_utils = require('../_utils'),
	controller = require('./authController');

routes.route('/auth')
		.all(_utils.token)
		.get(controller.home)
		.post(controller.home);

routes.route('/auth/create-token')
		.post(controller.createToken);

module.exports = routes;