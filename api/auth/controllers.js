const Services = require('./services');

module.exports = {
    login: async (req, res) => {
        const results = await Services.login(req, res);
        res.status(results.status).json(results.data);
    },

    register: async (req, res) => {
        const results = await Services.register(req, res);
        res.status(results.status).json(results.data);
    },
};