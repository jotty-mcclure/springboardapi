const Services = require('./services');

module.exports = {
    login: async (req, res, next) => {
        await Services.login(req, res)
                .then(results => {
                    if ( results.err ) next(results.err);
                    if ( results.data ) res.status(results.status).json(results.data);
                })
                .catch(err => next(err));
    },

    register: async (req, res, next) => {
        await Services.register(req, res)
                .then(results => {
                    if ( results.err ) next(results.err);
                    if ( results.data ) res.status(results.status).json(results.data);
                })
                .catch(err => next(err));
    },
};