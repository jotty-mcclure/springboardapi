const Model = require('./model');

module.exports = {
    fetchAll: async (params) => {
        return Model.find();
    },

    fetch: async (id) => {
        return Model.findById(id);
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