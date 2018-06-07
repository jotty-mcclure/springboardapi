var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var userSchema = new Schema({
	email: {type: String, index: true, unique: true},
	password: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	roles: [],
	accountId: String,
	stripeCustomerId: String,
	profile: {type: Object}
});

userSchema.methods.fullName = function(){
	return this.name.first + ' ' + this.name.last;
}

module.exports = mongoose.model('User', userSchema);