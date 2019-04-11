const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const secret = config.secret;

exports.verifyToken = (req, res, next) => {
        var token = req.body.token;

        if (req.headers['x-access-token'] != null) {
            token = req.headers['x-access-token'];
        }

        if (!token) return res.status(401).send({
            auth: false,
            message: 'No token found'
        });

        jwt.verify(token, secret, function (err, decoded) {
                if (err) return res.status(500).send({
                    auth: false,
                    message: 'Failed to authenticate token'
                });

                req.userId = decoded.id;
                next();
            });
        };