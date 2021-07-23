const jwtManager = require('../jwt/jwtmanager');
const { ObjectID } = require('mongodb');
var createError = require('http-errors');

class Uaa {
    authenticate(req, res, next) {
        if (req.url === "/auth/login" || req.url === "/auth/signup" || req.url === "/") {
            next(); 
            return;
        }
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ status: 'auth_error' });
        } else {
            const data = jwtManager.verify(token);

            if (!data) {
                return res.json({ status: 'auth_error' });
            }

            next();
        }
    }
}

module.exports = new Uaa();