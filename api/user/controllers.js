const User = require('./services');

module.exports = {
    find: async (req, res) => {
        await User.fetchAll(req.query)
                    .then( results => {
                        res.status(200).json(results);
                    })
                    .catch( err => {
                        res.status(500).json(err);
                    });
    },

    findOne: async (req, res) => {
        await User.fetch(req.params.id)
                    .then( results => {
                        res.status(200).json(results);
                    })
                    .catch( err => {
                        res.status(500).json(err);
                    });
    },

    create : async (req, res) => {
        await User.add(req.body)
                    .then( results => {
                        res.status(201).json(results);
                    })
                    .catch( err => {
                        res.status(500).json(err);
                    });
    },

    update: async (req, res) => {
        await User.edit(req.params.id, req.body)
                    .then( results => {
                        res.status(201).json(results);
                    })
                    .catch( err => {
                        res.status(500).json(err);
                    });
    },

    delete: async (req, res) => {
        await User.remove(req.params.id)
                .then( results => {
                    res.sendStatus(204);
                })
                .catch( err => {
                    res.status(500).json(err);
                });
    },
};