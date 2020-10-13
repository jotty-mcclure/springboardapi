const User = require('./services');

module.exports = {
    find: async (req, res, next) => {
        await User.fetchAll(req.queryHelpers)
                    .then(results => {
                        req.responseData = {
                            data: results,
                            status: 200
                        };
                        next();
                    })
                    .catch(err => {
                        next(err);
                    });
    },    

    findOne: async (req, res, next) => {
        await User.fetch(req.params.id)
                    .then(results => {
                        req.responseData = {
                            data: results,
                            status: 200
                        };
                        next();
                    })
                    .catch(err => {
                        next(err);
                    });
    },

    count: async (req, res, next) => {
        await User.count(req.queryHelpers)
                    .then(results => {
                        req.responseData = {
                            data: results,
                            status: 200
                        };
                        next();
                    })
                    .catch(err => {
                        next(err);
                    });
    },    

    create: async (req, res, next) => {
        await User.add(req.body)
                    .then(results => {
                        req.responseData = {
                            data: results,
                            status: 201
                        };
                        next();
                    })
                    .catch(err => {
                        next(err);
                    });
    },

    update: async (req, res, next) => {
        await User.edit(req.params.id, req.body)
                    .then(results => {
                        req.responseData = {
                            data: results,
                            status: 201
                        };
                        next();
                    })
                    .catch(err => {
                        next(err);
                    });
    },

    delete: async (req, res, next) => {
        await User.remove(req.params.id)
                    .then(results => {
                        if (results) {
                            res.sendStatus(204);
                        } else {
                            next(new Error('No record exists with this ID.'));
                        }
                    })
                    .catch(err => {
                        next(err);
                    });
    },
};