const Model = require('./model');
const bcrypt = require('bcrypt');
const utils = require('../../lib/utils');

module.exports = {
    fetchAll: async (query) => {
        const parsed = await utils.parseQuery(query);
        return Model.find(parsed.filters, parsed.select, parsed.cursor)
    },

    fetch: async (id) => {
        return Model.findById(id);
    },

    add: async (data) => {
        if ( data.password )
            data.password = bcrypt.hashSync(data.password, 10);

        return Model.create(data);
    },

    edit: async (id, data) => {
        if ( data.password )
            data.password = bcrypt.hashSync(data.password, 10);

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