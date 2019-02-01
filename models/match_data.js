var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    match_id: String,
    player1_username: String,
    player2_username: String,
    question_number: Number,
    player1_score: Number,
    player2_score: Number
});

module.exports = mongoose.model('MatchModel', MatchSchema);