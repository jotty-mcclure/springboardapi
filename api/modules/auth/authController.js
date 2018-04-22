var uuid	    = require('uuid/v1'),
    bcrypt		= require('bcrypt'),
    User	    = require('../../models/user'),
    _utils      = require('../_utils'),
    exporter    = {};

exporter.authenticate = (req, res) => {
    User.findOne({
		email: req.body.email
	}, function (err, user) {
		if (err) throw err;
		if (!user) {
			res.json({
				success: false,
                message: 'Authentication failed.',
                code: 'authentication-failure'
			});
		} else if (user) {
			// check if password matches
			bcrypt.compare(req.body.password, user.password, (err, doesMatch)=>{
				if (doesMatch){
					
					// delete any unneeded user object properties and setup the payload
					delete user.password;
                    
                    var token = _utils.createToken({
                                    id: user.id,
                                    email: user.email,
                                    roles: user.roles
                                });
                    
                    res.status(200).json({
                        success: true,
                        message: 'Successful authentication.',
                        code: 'authentication-success',
                        token: token
                    });
				}else{
					res.json({
						success: false,
						message: 'Authentication failed.',
                        code: 'authentication-failure'
					});
				}
			});
		}
	});    
};

module.exports = exporter;