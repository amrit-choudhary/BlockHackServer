var MatchData = require('../models/match_data');

var async = require('async');

var country_codes = require('../data/country_codes.json');
var flags = require('../data/flags.json');

exports.new_match = function (req, res, next) {
    MatchData.findOne({ 'match_id': req.body.match_id })
        .exec(function (err, found_match) {
            if (found_match) {
                res.send('Match already exits');
            } else {
                var new_match = new MatchData({
                    match_id: get_new_match_id(),
                    next_question_time: new Date(),
                    player1_username: req.body.username,
                    player2_username: '',
                    question_number: 0,
                    player1_score: 0,
                    player2_score: 0,
                    code1: "",
                    name1: "",
                    code2: "",
                    name2: "",
                    code3: "",
                    name3: "",
                    code4: "",
                    name4: "",
                    code: "",
                    name: ""
                });

                new_match.save(function (err) {
                    if (err) {
                        res.send('Cant create new match');
                    } else {
                        res.send(JSON.stringify(new_match));
                    }
                })
            }
        });
};

exports.join_match = function (req, res, next) {
    MatchData.findOne({ 'match_id': req.body.match_id })
        .exec(function (err, found_match) {
            if (found_match) {
                found_match.player2_username = req.body.username;

                found_match.save(function (err) {
                    if (err) {
                        res.send('Cant join');
                    } else {
                        res.send(JSON.stringify(found_match));
                    }
                })
            } else {
                res.send('Cant find match');
            }
        });
};

exports.new_question = function (req, res, next) {
    options = generate_options();

    MatchData.findOne({ 'match_id': req.body.match_id })
        .exec(function (err, found_match) {
            if (found_match) {
                found_match.code1 = options['Code1'];
                found_match.name1 = options['Name1'];

                found_match.code2 = options['Code2'];
                found_match.name2 = options['Name2'];

                found_match.code3 = options['Code3'];
                found_match.name3 = options['Name3'];

                found_match.code4 = options['Code4'];
                found_match.name4 = options['Name5'];

                found_match.code = options['Code'];
                found_match.name = options['Name'];

                found_match.save(function (err) {
                    if (err) {
                        res.send('Cant join');
                    } else {
                        res.send(JSON.stringify(found_match));
                    }
                })
            } else {
                res.send('Cant find match');
            }
        });
}

exports.get_question = function (req, res, next) {
    MatchData.findOne({ 'match_id': req.body.match_id })
        .exec(function (err, found_match) {
            if (found_match) {
                res.send(JSON.stringify(found_match));
            } else {
                res.send('Cant find match');
            }
        });
}

function get_new_match_id() {
    return Math.random().toString(36).substr(2, 4);
}

function generate_options() {
    var number_array = [];
    var i;

    for (i = 0; i < 196; i++) {
        number_array.push(i);
    }

    var rand1 = Math.floor(Math.random() * 196);
    var value1 = number_array[rand1];
    var code1 = flags[value1]['Code'];
    var name1 = "";

    for (i in country_codes) {
        if (country_codes[i]['Code'] == code1) {
            name1 = country_codes[i]['Name'];
            break;
        }
    }

    number_array.splice(rand1, 1);

    var rand2 = Math.floor(Math.random() * 195);
    var value2 = number_array[rand2];
    var code2 = flags[value2]['Code'];

    var name2 = "";

    for (i in country_codes) {
        if (country_codes[i]['Code'] == code2) {
            name2 = country_codes[i]['Name'];
            break;
        }
    }

    number_array.splice(rand2, 1);

    var rand3 = Math.floor(Math.random() * 194);
    var value3 = number_array[rand3];
    var code3 = flags[value3]['Code'];

    var name3 = "";

    for (i in country_codes) {
        if (country_codes[i]['Code'] == code3) {
            name3 = country_codes[i]['Name'];
            break;
        }
    }

    number_array.splice(rand3, 1);

    var rand4 = Math.floor(Math.random() * 193);
    var value4 = number_array[rand4];
    var code4 = flags[value4]['Code'];

    var name4 = "";

    for (i in country_codes) {
        if (country_codes[i]['Code'] == code4) {
            name4 = country_codes[i]['Name'];
            break;
        }
    }

    number_array.splice(rand4, 1);

    var rand5 = Math.floor(Math.random() * 4);

    result = {
        "Code1": code1,
        "Name1": name1,

        "Code2": code2,
        "Name2": name2,

        "Code3": code3,
        "Name3": name3,

        "Code4": code4,
        "Name4": name4
    }

    if (rand5 == 0) {
        result["Code"] = code1;
        result["Name"] = name1;
    }

    if (rand5 == 1) {
        result["Code"] = code2;
        result["Name"] = name2;
    }

    if (rand5 == 2) {
        result["Code"] = code3;
        result["Name"] = name3;
    }

    if (rand5 == 3) {
        result["Code"] = code4;
        result["Name"] = name4;
    }

    return result;
}