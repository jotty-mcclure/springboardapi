const jwt  = require('jsonwebtoken');
const _    = require('lodash');
const mung = require('express-mung')

const whitelist = [
    { 'method': 'POST', 'path': '/auth/local' },
    { 'method': 'POST', 'path': '/auth/local/register' }
];

const extractToken = (req) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    return authHeader && (authHeader).replace(/Bearer\s/g,'');
}

module.exports = {
    isAuthenticated: (req, res, next) => {
        const isWhitelisted = _.find(whitelist, {'method': req.method, 'path': req.url.replace('/api/v1','')});
        const token = extractToken(req);

        if ( isWhitelisted ) {
            next();
        } else if ( token) {
            jwt.verify(token, req.app.get('secret'), function(err, userObject) {
                if (err) {
                    var message = (err.name == 'TokenExpiredError')? 'Token has expired.': 'Failed to authenticate token.';
                    return res.status(403).json({ message: message });
                } else if ( userObject ) {
                    // if everything is good, save to request for use in other routes
                    req.authenticatedUser = userObject;
                    next();
                }
            });
        } else {
            res.status(403).json({message: 'Invalid access token.'});
        }
    },

    responseFormatter: mung.json((body, req, res) => {
        return {
            data: body,
            status: res.statusCode
        };
    })
}