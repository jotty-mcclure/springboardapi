var routes = require('express').Router(),
	_utils = require('../_utils'),
	controller = require('./userController');

routes.route('/user')
		.all(_utils.token)
		.get(controller.getUserProfile)
		.post(controller.updateUserProfile);

module.exports = routes;