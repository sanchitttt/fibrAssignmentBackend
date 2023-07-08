const { postCreateQuiz } = require('../controllers/quiz.controller');
const router = require('express').Router();

router.post('/create', postCreateQuiz)

module.exports = router;