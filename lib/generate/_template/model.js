const mongoose	= require('mongoose');
const schema    = mongoose.Schema;

const model = new schema({
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('{{singular_capitalized}}', model);