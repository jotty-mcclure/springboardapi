var utilities	= {},
	bcrypt		= require('bcrypt'),
	promise		= require('bluebird'),
	config		= require('../../_config'),
	jwt			= require('jsonwebtoken');

utilities.enforceJson = function(req, res, next) {
	var contype = req.headers['content-type'];
	if (!contype || contype.indexOf('application/json') !== 0) return res.send(400);
	next();
}

utilities.createToken = (payload) => {
    var token = jwt.sign(payload, config.env[config.mode].secret, {jwtid: payload.id}, {
        expiresIn: 86400 // expires in 24 hours
    });
    return token;
}

utilities.token = function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, req.app.get('secret'), function(err, decoded) {
			if (err) {
				var message = (err.name == 'TokenExpiredError')? 'Token has expired.': 'Failed to authenticate token.';
				return res.json({ success: false, message: message });
			} else {
				// if everything is good, save to request for use in other routes
				req.authenticatedUser = decoded;
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
}

utilities.authenticateUser = (body) => {
	var User = require('../models/user');

	return User.findOne({ email: body.email})
			.then((user)=>{
				if (!user) {
					return {
						success: false,
						message: 'Authentication failed.',
						code: 'authentication-failure'
					};
				} else if (user) {
					// check if password matches
					return bcrypt.compare(body.password, user.password)
							.then((doesMatch) => {
								if (doesMatch){
									// delete any unneeded user object properties and setup the payload
									delete user.password;
									
									var token = utilities.createToken({
													id: user.id,
													email: user.email,
													roles: user.roles,
													type: 'user'
												});
									
									return {
										success: true,
										message: 'Successful authentication.',
										code: 'authentication-success',
										token: token
									};
								}else{
									return {
										success: false,
										message: 'Authentication failed.',
										code: 'authentication-failure'
									};
								}
							})
							.catch((err) => {
								console.log(err);
								return false;
							});
				}
			})
			.catch((err)=>{
				console.log(err);
				return err;
			});
}

module.exports = utilities;