var uuid	    		= require('uuid/v1'),
	bcrypt				= require('bcrypt'),
	stripe				= require("stripe")("sk_test_Tuwf8Z34ZRlRXbOseJRUXjm4"),
	mongo				= require('mongodb'),
    User	    		= require('../../models/user'),
	_utils      		= require('../_utils'),
    exporter    		= {};

exporter.getUserInformation = (req, res) => {
	let objId = new mongo.ObjectID(req.authenticatedUser.id);
	User.findOne({ _id: objId}, {profile: 1})
		.then((user) => {
			if(user.profile) {
				res.status(200).json(user.profile);
			} else {
				res.status(500);
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

exporter.updateUserInformation = (req, res) => {
	let objId = new mongo.ObjectID(req.authenticatedUser.id);
	let updateObj = {};
	Object.keys(req.body).forEach((field)=>{
		updateObj[`profile.${field}`] = req.body[field];
	});

	User.update({ _id: objId}, {$set: updateObj})
		.then((user) => {
			res.status(200).json(user.profile);
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = exporter;