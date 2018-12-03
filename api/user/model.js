const mongoose	= require('mongoose');
const schema    = mongoose.Schema;

const Schema = new schema({
    fullName: {type: String, required: true},
    email: {type: String, index: true, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "authenticated"},
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', Schema);