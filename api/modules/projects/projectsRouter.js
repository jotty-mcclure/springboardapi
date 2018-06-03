var routes = require('express').Router(),
	_utils = require('../_utils'),
	controller = require('./projectsController');

routes.route('/projects')
		.all(_utils.token)
		.get(controller.getAllProjects)
		.post(controller.createProject);

routes.route('/projects/:id')
		.all(_utils.token)
		.get(controller.getProject)
		.put(controller.updateProject)
		.delete(controller.deleteProject);

module.exports = routes;