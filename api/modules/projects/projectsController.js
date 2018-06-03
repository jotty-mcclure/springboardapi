var uuid	    		= require('uuid/v1'),
	bcrypt				= require('bcrypt'),
	mongo				= require('mongodb'),
    Project	    		= require('../../models/project'),
	_utils      		= require('../_utils'),
    exporter    		= {};

exporter.getAllProjects = (req, res) => {
	Project.find({ ownerId: req.authenticatedUser.id})
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			console.log(err);
		});
};

exporter.getProject = (req, res) => {
	let objId = new mongo.ObjectID(req.params.id);

	Project.findOne({ _id: objId})
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			console.log(err);
		});
}

exporter.createProject = (req, res) => {
	let project = req.body;
	project.ownerId = req.authenticatedUser.id;

	var newProject = new Project(project);
	newProject.save()
		.then(function(newProject) {
			res.status(200).json(newProject);
		})
		.catch((err) => {
			console.log(err);
		});
}

exporter.updateProject = (req, res) => {
	let objId = new mongo.ObjectID(req.params.id);
	let updateObj = {};

	Object.keys(req.body).forEach((field)=>{
		updateObj[field] = req.body[field];
	});

	Project.update({ _id: objId}, {$set: updateObj})
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			console.log(err);
		});
}

exporter.deleteProject = (req, res) => {
	let objId = new mongo.ObjectID(req.params.id);

	Project.remove({ _id: objId })
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = exporter;