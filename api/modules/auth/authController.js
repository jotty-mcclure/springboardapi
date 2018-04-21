const exp = {};

var _utils = require('../_utils');

exp.authenticate = (req, res) => {
    res.status(200).json({message: 'The Auth Router works...'});
};

exp.createToken = (req, res) => {
    var token = _utils.createToken(req.body);
    res.status(200).json({token: token});
};

module.exports = exp;