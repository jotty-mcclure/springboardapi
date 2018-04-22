var routes = require('express').Router(),
	_utils = require('../_utils'),
	controller = require('./authController');

// routes.route('/authenticate')
// 	.all(_utils.token)
// 	.post(controller.home);

routes.route('/authenticate')
		.post(controller.authenticate);

routes.route('/verify-email')
		.post(controller.verifyEmail);	

routes.route('/register')
		.post(controller.register);		

module.exports = routes;