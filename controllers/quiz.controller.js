const QuizService = require('../services/quiz.service');
const QuizServiceInstance = new QuizService();
const UserService = require('../services/user.service');
const UserServiceInstance = new UserService();

const postCreateQuiz = async (req, res) => {
    try {
        const newQuiz = await UserServiceInstance.createNewQuiz(req.body);
        const createdAt = newQuiz.createdAt.toDateString();
        const updatedAt = newQuiz.updatedAt.toDateString();
        res.status(200).json({
            ...newQuiz,
            quizName: newQuiz.quizName,
            questions: 0,
            responses: 0,
            createdBy: newQuiz.createdBy,
            createdAt: createdAt,
            updatedAt: updatedAt,
            _id: newQuiz._id
        });
    } catch (error) {
        console.log(error);
    }
}

const getByQuizId = async (req, res) => {
    try {
        const { quizId } = req.params;
        const newQuiz = await QuizServiceInstance.findOne(quizId)
        if (!newQuiz) throw {
            "message": "The quiz which you are trying to doesn't exist",
            status: 404
        }
        res.json(newQuiz);
    } catch (error) {
        res.status(error.status).json(error);
    }
}
const postQuizById = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { questions, quizName } = req.body;
        const newQuiz = await QuizServiceInstance.updateQuizById(quizId, questions, quizName)
        res.json(newQuiz);
    } catch (error) {
        console.log(error);
    }
}
const deleteQuizById = async (req, res) => {
    try {
        const { quizId } = req.params;
        await QuizServiceInstance.deleteQuizById(quizId)
        res.status(204).end();
    } catch (error) {
        console.log(error);
    }
}
const postResponse = async (req, res) => {
    try {
        const { quizId } = req.params;
        await QuizServiceInstance.addResponse(quizId, req.body)
        res.status(200).end();
    } catch (error) {
        console.log(error);
    }
}
const getResponsesByQuizId = async (req, res) => {
    try {
        const { quizId } = req.params;
        const result = await QuizServiceInstance.getResponses(quizId, req.body)
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { postCreateQuiz, getByQuizId, postQuizById, deleteQuizById, postResponse, getResponsesByQuizId }