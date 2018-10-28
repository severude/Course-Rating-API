const auth = require('basic-auth');
const User = require('../models').User;

function authorized(req, res, next) {
    const credentials = auth(req);
    if(credentials) {
        User.authenticate(credentials.name, credentials.pass, function(err, user) {
            console.log('Hello?');
            if(err || !user) {
                const error = new Error('Incorrect email or password.');
                error.status = 401;
                return next(error);
            } else {
                res.body = user;
                return next();
            }
        });
    } else {
        const error = new Error('Email and password are required.');
        error.status = 401;
        return next(error);
    }
}

module.exports.authorized = authorized;
