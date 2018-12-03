const User = require('./services');

module.exports = {
    find: async (req, res) => {
        const results = await User.fetchAll(req.query);
        res.status(200).json(results);
    },

    findOne: async (req, res) => {
        const results = await User.fetch(req.params.id);
        res.status(200).json(results);
    },

    create : async (req, res) => {
        const results = await User.add(req.body);
        res.status(200).json(results);
    },

    update: async (req, res) => {
        const results = await User.edit(req.params.id, req.body);
        res.status(200).json(results);
    },

    delete: async (req, res) => {
        const results = await User.remove(req.params.id);
        res.sendStatus(200);
    },
};