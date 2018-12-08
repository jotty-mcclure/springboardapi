const Services = require('./services');

module.exports = {
    find: async (req, res, next) => {
        await Services.fetchAll(req.query)
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
        await Services.fetch(req.params.id)
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
        await Services.count(req.query)
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
        await Services.add(req.body)
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
        await Services.edit(req.params.id, req.body)
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
        await Services.remove(req.params.id)
                        .then(results => {
                            res.sendStatus(204);
                        })
                        .catch(err => {
                            next(err);
                        });
    },
};