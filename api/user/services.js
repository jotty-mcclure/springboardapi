const Model = require('./model');
const bcrypt = require('bcrypt');

module.exports = {
    fetchAll: async (helpers) => {
        return await Model
                        .find(helpers.filters)
                        .select(helpers.select)
                        .sort(helpers.sort)
                        .skip(helpers.skip)
                        .limit(helpers.limit)
    },

    fetch: async (id) => {
        return await Model.findById(id);
    },

    count: async (helpers) => {
        return await Model
                        .find(helpers.filters)
                        .count();
    },    

    add: async (data) => {
        if ( data.password )
            data.password = bcrypt.hashSync(data.password, 10);

        return await Model.create(data);
    },

    edit: async (id, data) => {
        if ( data.password )
            data.password = bcrypt.hashSync(data.password, 10);

        return await Model.findById(id)
                            .then(doc => {
                                doc.set(data);
                                return doc.save();
                            });
    },

    remove: async (id) => {
        return await Model.findByIdAndRemove(id);
    },
};