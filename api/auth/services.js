const bcrypt = require('bcrypt');
const config = require('../../_config');
const jwt    = require('jsonwebtoken');
const Model  = require('../user/model');

module.exports = {
    createToken: async (payload) => {
        // expires in 24 hours
        return jwt.sign(payload, config.secret, { expiresIn: 86400 });
    },

    login: async (req, res) => {
        return Model.findOne({$or: [{email: req.body.identity}, {username: req.body.identity}]})
            .then( user => {
                if (!user) {
                    return {
                        status: 401,
                        data: 'Authentication failed.'
                    };
                } else if (user) {
                    // check if password matches
                    return bcrypt.compare(req.body.password, user.password)
                            .then((doesMatch) => {
                                if (doesMatch){
                                    return module.exports.createToken({
                                                'fullName': user.fullName,
                                                'username': user.username,
                                                'email': user.email
                                            })
                                            .then(token => {
                                                return {
                                                    status: 200,
                                                    data: {
                                                        token: token
                                                    }
                                                };
                                            });
                                }else{
                                    return {
                                        status: 401,
                                        data: 'Authentication failed.'
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
    },

    register: async (req, res, next) => {
        const userObj = req.body;
        const unhashedPass = req.body.password;
        const createStripeCustomer = req.body.createStripeCustomer;
        const stripeToken = userObj.stripeToken || null;

        // overwrite text password with hashed response
        userObj.password = bcrypt.hashSync(userObj.password, 256);

        // Save the new user
        return Model.create(userObj)
                .then( newUser => {
                    // Check if a new stripe customer should be created
                    if ( createStripeCustomer && stripeToken ) {
                        const newCustomer = {
                            email: newUser.email,
                            source: stripeToken,
                            metadata: {
                                id: newUser.id,
                                name: newUser.name.last + ', ' + newUser.name.first
                            }
                        };

                        return stripe.customers
                                .create(newCustomer)
                                .then(function(customer) {
                                    // Update the new user with the account details and strip info.
                                    var updateObj = {
                                        accountId: newAccountId,
                                        stripeCustomerId: customer.id
                                    };

                                    return Model.update({'email': customer.email}, updateObj)
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
                        return module.exports.createToken({
                                    'fullName': newUser.fullName,
                                    'username': newUser.username,
                                    'email': newUser.email
                                })
                                .then(token => {
                                    return {
                                        status: 200,
                                        data: {
                                            token: token
                                        }
                                    };
                                });
                    }
                }).catch(function(err) {
                    console.log(err)
                    return false;
                });
    }
};