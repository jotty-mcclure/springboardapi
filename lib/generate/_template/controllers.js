const Services = require('./services');

module.exports = {
    find: async (req, res) => {
        const results = await Services.fetchAll(req.query);
        res.status(200).json(results);
    },

    findOne: async (req, res) => {
        const results = await Services.fetch(req.params.id);
        res.status(200).json(results);
    },

    create : async (req, res) => {
        const results = await Services.add(req.body);
        res.status(200).json(results);
    },

    update: async (req, res) => {
        const results = await Services.edit(req.params.id, req.body);
        res.status(200).json(results);
    },

    delete: async (req, res) => {
        const results = await Services.remove(req.params.id);
        res.sendStatus(200);
    },
};