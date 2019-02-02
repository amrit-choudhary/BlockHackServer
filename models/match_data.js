var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    match_id: String,
    next_question_time: Date,
    player1_username: String,
    player2_username: String,
    question_number: Number,
    player1_score: Number,
    player2_score: Number,
    code1: String,
    name1: String,
    code2: String,
    name2: String,
    code3: String,
    name3: String,
    code4: String,
    name4: String,
    code: String,
    name: String
});

module.exports = mongoose.model('MatchModel', MatchSchema);