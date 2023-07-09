const { postCreateQuiz, getByQuizId, postQuizById, deleteQuizById, postResponse, getResponsesByQuizId } = require('../controllers/quiz.controller');
const router = require('express').Router();

router.post('/create', postCreateQuiz)

router.get('/responses/:quizId', getResponsesByQuizId)
router.post('/:quizId/response', postResponse);
router.get('/:quizId', getByQuizId)
router.post('/:quizId', postQuizById);
router.delete('/:quizId', deleteQuizById)


module.exports = router;