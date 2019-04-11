// AuthController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());
var User = require('../models/User');

var jwt = require('jsonwebtoken');
var config = require ('../config/config.js');

exports.register = (req, res) => {
    // Hash the password
    var hashPassu = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        password: hashPassu,
        isadmin: req.body.isadmin
    }, function (err, username) {
        if (err) {
            return res.status(500).send("Ongelma luotaessa käyttäjää, yritä uudelleen: " + err)
        }

        // Create token
        var token = jwt.sign({ username: req.body.username, isadmin: true}, config.secret, {expiresIn: 86400});


        res.status(200).send({success: true, token: token});
    })
};

exports.login = (req, res) => {
    User.findOne({username: req.body.username}, function(err, user) {
        if (err) return res.status(500).send("Server error");
        if(!user) return res.status(404).send("User not found")

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

        var token = jwt.sign({ username: req.body.username, isadmin: true }, config.secret, {expiresIn: 86400});

        res.status(200).send({auth: true, token: token, user: user});
    }
    )
};