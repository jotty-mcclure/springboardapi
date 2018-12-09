const Model = require('./model');

module.exports = {
    fetchAll: async (helpers) => {
        return Model
                .find(helpers.filters)
                .select(helpers.select)
                .sort(helpers.sort)
                .skip(helpers.skip)
                .limit(helpers.limit)
    },

    fetch: async (id) => {
        return Model.findById(id);
    },

    count: async (helpers) => {
        return Model
                .find(helpers.filters)
                .count();
    },   

    add: async (data) => {
        return Model.create(data);
    },

    edit: async (id, data) => {
        return Model.findById(id)
                    .then(doc => {
                        doc.set(data);
                        return doc.save();
                    });
    },

    remove: async (id) => {
        return Model.findByIdAndRemove(id);
    },
};