var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var schema = new Schema({
	ownerId: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: false },
	estimatedWrap: { type: String, required: false },
	callTime: { type: Date, required: false },
	crew: { type: Array, required: false },
	active: { type: Boolean, default: true},
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', schema);