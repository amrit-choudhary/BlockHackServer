var express = require('express')
var router = express.Router();

var match_controller = require('../controllers/match_controller');

router.post('/new', match_controller.new_match);
router.post('/join', match_controller.join_match);
router.post('/new_question', match_controller.new_question);
router.post('/get_question', match_controller.get_question);

module.exports = router;