const exp = {};

var _utils = require('../_utils');

exp.home = (req, res) => {
    res.status(200).json({message: 'The Auth Router works...'});
};

exp.createToken = (req, res) => {
    var token =_utils.createToken({
        id: 'abc123-123-456-789',
        username: 'jotty',
        roles: ['manager', 'editor', 'admin']
    });
    
    res.status(200).json({token: token});
};

module.exports = exp;