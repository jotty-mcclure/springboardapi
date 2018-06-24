var uuid	    		= require('uuid/v1'),
	bcrypt				= require('bcrypt'),
	stripe				= require("stripe")("sk_test_Tuwf8Z34ZRlRXbOseJRUXjm4"),
    User	    		= require('../../models/user'),
	_utils      		= require('../_utils'),
	messageTemplates   	= require('../messageTemplates/index'),
    exporter    		= {};


exporter.test = (req, res) => {
	res.status(200).json({message:"hello world!"});
}

exporter.verifyEmail = (req, res) => {
	if (req.body.email) {
		User.findOne({ email: req.body.email})
        	.then((user)=>{
				if (user) {
					res.send(200);
				} else {
					var token = _utils.createToken({
						id: uuid(),
						email: req.body.email,
						type: 'email-verification'
					});
					var mailData = {
						from: req.app.locals.config.env[req.app.locals.config.mode].fromEmail,
						to: req.body.email,
						subject: 'Verify email',
						html: messageTemplates.verifyEmail({email: req.body.email, frontEndURL: `http://localhost:8888/register.html?token=${token}&email=${req.body.email}`})
					};
					req.app.locals.transporter.sendMail(mailData)
						.then((response) => {
							res.send(200);
						})
						.catch((error) => {
							console.log(error);
						});
				}
			});
	} else {
		res.send(500);
	}
}

exporter.register = (req, res) => {
	req.authenticatedUser.type = 'email-verification';
	req.authenticatedUser.email = req.body.email;
	
	if(req.body.password && req.authenticatedUser.type === 'email-verification' && req.authenticatedUser.email === req.body.email){
		var userObj = req.body,
			unhashedPass = req.body.password,
			createStripeCustomer = req.body.createStripeCustomer,
			stripeToken = userObj.stripeToken || null;

		// overwrite text password with hashed response
		userObj.password = bcrypt.hashSync(userObj.password, 256);

		// Save the new user
		var newUser = new User(userObj);
		newUser.save()
			.then(function(newUser) {
				// Check if a new stripe customer should be created
				if (createStripeCustomer && stripeToken) {
					var newAccountId = uuid(),
						newCustomer = {
							email: newUser.email,
							source: stripeToken,
							metadata: {
								accountId: newAccountId,
								id: newUser.id,
								name: newUser.name.last + ', ' + newUser.name.first
							}
						};

					return stripe.customers.create(newCustomer)
						.then(function(customer) {
							// Update the new user with the account details and strip info.
							var updateObj = {
								accountId: newAccountId,
								stripeCustomerId: customer.id
							};

							return User.update({'email': customer.email}, updateObj)
								.then(function(updatedUser) {
									return res.send(200);
								}).catch(function(err) {
									console.log(err);
									return false;
								});
						}).catch(function(err) {
							console.log(err);
							return false;
						});
				} else {
					userObj.password = unhashedPass;
					return _utils.authenticateUser(userObj)
								.then((response) => {
									return res.status(200).json(response);;
								})
								.catch((err) => {
									console.log(err);
									return false;
								});
				}
			}).catch(function(err) {
				console.log(err)
				return res.status(400);
			});
	} else {
		res.status(400);
	}
};

exporter.authenticate = (req, res) => {
	_utils.authenticateUser(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
        .catch((err) => {
            console.log(err);
        });
};

module.exports = exporter;