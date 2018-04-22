var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var settingsSchema = new Schema({
	main: { type: Boolean, default: true },
	companyName: String,
	address: {
		street: String,
		suite: String,
		city: String,
		state: String,
		zip: Number,
		country: { type: String, default: 'US' }
	},
	active: Boolean,
	billingProfileId: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);