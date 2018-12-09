const jwt    = require('jsonwebtoken');
const _      = require('lodash');
const qs     = require('mongo-querystring');
const logger = require('./logger');
const roles  = require('./roles');

const extractToken = (req) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    return authHeader && (authHeader).replace(/Bearer\s/g,'');
}

const parseHelpersFromBody = (body) => {
    return {
        filters: body.filters || {},
        select: body.select || null,
        sort: body.sort || null,
        skip: body.skip || null,
        limit: body.limit || null
    };
}

const parseHelpersFromQuery = async (querystring) => {
    let limit = null;
    let skip = null;
    let sort = {};
    let select = {};

    if ( querystring.hasOwnProperty('select') ) {
        let fieldValue = 1;

        if( querystring.select.startsWith('-') ) {
            fieldValue = 0;
            querystring.select = querystring.select.substr(1);
        }

        querystring.select
            .split(',')
            .forEach(field => {
                select[field] = fieldValue;
            });

        delete querystring.select;
    }

    if ( querystring.hasOwnProperty('limit') || querystring.hasOwnProperty('skip') ) {
        limit = parseInt(querystring.limit) || null;
        skip = parseInt(querystring.skip) || 0;

        delete querystring.limit;
        delete querystring.skip;
    }

    if ( querystring.hasOwnProperty('sort') ) {
        querystring.sort
            .split(',')
            .forEach(field => {
                if( field.startsWith('-') ) {
                    sort[field.substr(1)] = -1;
                } else {
                    sort[field] = 1;
                }
            });

        sort = sort;
        delete querystring.sort;
    }

    return {
        filters: new qs().parse(querystring),
        select: select,
        skip: skip,
        limit: limit
    };
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
        logger.error(`${err.status || 500} - ${err.message} - ${JSON.stringify(req.body)} - ${err.stack} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    
        // render the error page
        res.status(err.status || 500).send(err.message);
    },

    parseQuery: async (req, res, next) => {
        if (req.method !== 'GET')
            next(new Error(`Error! Query parsing is only allowed for GET requests.`));

        if (Object.keys(req.query).length && Object.keys(req.body).length)
            next(new Error(`You have used both query string parameters and sent a body object. You cannot use both.`));

        try {
            if (Object.keys(req.query).length) 
            req.queryHelpers = await parseHelpersFromQuery(req.query);

            if (Object.keys(req.body).length) 
                req.queryHelpers = await parseHelpersFromBody(req.body);

            next();
        }
        
        catch (e) {
            next(new Error('There was an error trying to build the query.'));
        }
    },
}