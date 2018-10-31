const auth = require('basic-auth');
const User = require('../models').User;

function authorized(req, res, next) {
    const credentials = auth(req);
    if(credentials) {
        User.authenticate(credentials.name, credentials.pass, function(err, user) {
            if(err || !user) {
                const error = new Error('Incorrect email or password.');
                error.status = 401;
                return next(error);
            } else {
                req.body.user = user;
                return next();
            }
        });
    } else {
        const error = new Error('Email and password are required to perform this operation.');
        error.status = 401;
        return next(error);
    }
}

module.exports.authorized = authorized;
