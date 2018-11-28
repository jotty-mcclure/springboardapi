const Model = require('./model');
const bcrypt = require('bcrypt');

module.exports = {
    fetchAll: (params) => {
        return Model.find();
    },

    fetch: (id) => {
        return Model.findById(id);
    },

    add: (data) => {
        if ( data.password )
            data.password = bcrypt.hashSync(data.password, 10);

        return Model.create(data);
    },

    edit: (id, data) => {
        if ( data.password )
            data.password = bcrypt.hashSync(data.password, 10);

        return Model.findById(id)
                    .then(doc => {
                        doc.set(data);
                        return doc.save();
                    });
    },

    remove: (id) => {
        return Model.findByIdAndRemove(id);
    },
};