const jwt    = require('jsonwebtoken');
const _      = require('lodash');
const qs     = require('mongo-querystring');
const logger = require('./logger');
const roles  = require('./roles');

const extractToken = (req) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    return authHeader && (authHeader).replace(/Bearer\s/g,'');
}

module.exports = {
    createToken: async (secret, payload) => {
        // expires in 24 hours
        return jwt.sign(payload, secret, { expiresIn: 86400 });
    },
    
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
                            return hasAccess ? next() : res.status(403).json({ message: 'Unauthorized.' });
                        });
                }
            });
        } else {
            res.status(403).json({message: 'Invalid access token.'});
        }
    },

    responseObject: async (req, res, next) => {
        const status = req.responseData.status;
        const response = req.responseData.data;
        res.status(status).json(response);
    },

    errorHandler: (err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // add this line to include winston logging
        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    
        // render the error page
        res.status(err.status || 500).send(err.message);
    },

    parseQuery: async (querystring) => {
        const select = {};
        const cursor = {};
        
        if ( querystring.hasOwnProperty('fields') ) {
            let fieldValue = 1;
    
            if( querystring.fields.startsWith('-') ) {
                fieldValue = 0;
                querystring.fields = querystring.fields.substr(1);
            }
    
            querystring.fields
                .split(',')
                .forEach(field => {
                    select[field] = fieldValue;
                });
    
            delete querystring.fields;
        }
    
        if ( querystring.hasOwnProperty('limit') || querystring.hasOwnProperty('skip') ) {
            cursor.limit = querystring.limit;
            cursor.skip = parseInt(querystring.skip) || 0;
    
            delete querystring.limit;
            delete querystring.skip;
        }
    
        if ( querystring.hasOwnProperty('sort') ) {
            let sort = {};
            querystring.sort
                .split(',')
                .forEach(field => {
                    if( field.startsWith('-') ) {
                        sort[field.substr(1)] = -1;
                    } else {
                        sort[field] = 1;
                    }
                });
    
            cursor.sort = sort;
            delete querystring.sort;
        }
    
        return {
            filters: new qs().parse(querystring),
            select: select,
            cursor: cursor
        };
    },
}