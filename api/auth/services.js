const bcrypt = require('bcrypt');
const _      = require('lodash');
const utils  = require('../../lib/utils');
const Model  = require('../user/model');

module.exports = {
    login: async (req) => {
        const searchCriteria = { $or: [{email: req.body.identity}, {username: req.body.identity}] };
        return await Model.findOne(searchCriteria)
                .then( user => {
                    if (!user)
                        return { status: 401, data: 'Authentication failed.' };
                    
                    return bcrypt.compare(req.body.password, user.password)
                            .then( doesMatch => {
                                if (!doesMatch)
                                    return { status: 401, data: 'Authentication failed.' };

                                const payload = _.pick(user, ['fullName', 'username', 'email', 'role']);
                                return utils.createToken(req.app.get('config').secret, payload)
                                        .then(token => {
                                            return { status: 200, data: { token: token } };
                                        });
                            })
                            .catch( err => {
                                return { status: 500, data: null, err: err };
                            });
                })
                .catch( err =>{
                    return { status: 500, data: null, err: err };
                });
    },

    register: async (req) => {
        const userObj = req.body;
        const unhashedPass = req.body.password;
        const createStripeCustomer = req.body.createStripeCustomer;
        const stripeToken = userObj.stripeToken || null;

        // overwrite text password with hashed response
        userObj.password = bcrypt.hashSync(userObj.password, 256);

        // Save the new user
        return await Model.create(userObj)
                .then( newUser => {
                    // Check if a new stripe customer should be created
                    if ( createStripeCustomer && stripeToken ) {
                        const newStripeCustomer = {
                            email: newUser.email,
                            source: stripeToken,
                            metadata: {
                                id: newUser.id,
                                name: newUser.fullName
                            }
                        };

                        return stripe.customers
                                .create(newStripeCustomer)
                                .then( customer => {
                                    // Update the new user with the account details and strip info.
                                    const updateObj = {
                                        accountId: newAccountId,
                                        stripeCustomerId: customer.id
                                    };

                                    return Model.update({'email': customer.email}, updateObj)
                                                    .then( updatedUser => {
                                                        return { status: 201, data: updatedUser };
                                                    })
                                                    .catch( err =>{
                                                        return { status: 500, data: null, err: err };
                                                    });
                                })
                                .catch( err =>{
                                    return { status: 500, data: null, err: err };
                                });
                    } else {
                        const payload = _.pick(newUser, ['fullName', 'username', 'email', 'role']);
                        return utils.createToken(req.app.get('config').secret, payload)
                                        .then(token => {
                                            return { status: 201, data: { token: token } };
                                        });
                    }
                })
                .catch( err =>{
                    return { status: 500, data: null, err: err };
                });
    }
};