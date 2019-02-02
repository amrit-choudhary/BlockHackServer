var UserData = require('../models/user_data');

var async = require('async');

exports.user_login = function (req, res, next) {
    UserData.findOne({ 'username': req.body.username })
        .exec(function (err, found_user) {
            if (found_user) {
                if (found_user.password == req.body.password) {
                    res.send(JSON.stringify(found_user));
                } else {
                    res.send('Wrong pass');
                }
            } else {
                res.send('Cant find user');
            }
        });
};

exports.user_register = function (req, res) {
    UserData.findOne({ 'username': req.body.username })
        .exec(function (err, found_user) {
            if (found_user) {
                res.send('User already exits');
            } else {
                var newUser = new UserData({
                    username: req.body.username,
                    password: req.body.password,
                    level: 1,
                    matches: 0,
                    matches_won: 0,
                    experience: 0
                });

                newUser.save(function (err) {
                    if (err) {
                        res.send('Cant register');
                    } else {
                        res.send('Sucessfully registered');
                    }
                })
            }
        });
};