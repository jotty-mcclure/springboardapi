const jwt  = require('jsonwebtoken');
const _    = require('lodash');
const mung = require('express-mung');
const logger = require('./logger');
const roles = require('./roles');

const extractToken = (req) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    return authHeader && (authHeader).replace(/Bearer\s/g,'');
}

module.exports = {
    isAuthenticated: async (req, res, next) => {
        const token = extractToken(req);

        if ( token) {
            jwt.verify(token, req.app.get('secret'), function(err, userObject) {
                if (err) {
                    var message = (err.name == 'TokenExpiredError')? 'Token has expired.': 'Failed to authenticate token.';
                    return res.status(403).json({ message: message });
                } else if ( userObject ) {
                    // if everything is good, save to request for use in other routes
                    req.authenticatedUser = userObject;

                    // check if the user has roles needed for requested route.
                    roles.checkAccess(req)
                        .then( hasAccess => {
                            return hasAccess ? next() : res.status(401).json({ message: 'denied.' });
                        });
                }
            });
        } else {
            res.status(403).json({message: 'Invalid access token.'});
        }
    },

    errorHandler: (err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // add this line to include winston logging
        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    
        // render the error page
        res.send('error', 404);
    },

    responseFormatter: mung.json((body, req, res) => {
        return {
            data: body,
            status: res.statusCode
        };
    })
}