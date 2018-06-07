var routes = require('express').Router(),
	_utils = require('../_utils'),
	controller = require('./userController');

routes.route('/user')
		.all(_utils.token)
		.get(controller.getUserProfile)
		.post(controller.updateUserProfile);

routes.route('/user/update-credentials')
		.all(_utils.token)
		.post(controller.updateCredentials);

module.exports = routes;