var routes = require('express').Router(),
	_utils = require('../_utils'),
	controller = require('./userController');

routes.route('/user')
		.all(_utils.token)
		.get(controller.getUserInformation)
		.post(controller.updateUserInformation);

module.exports = routes;