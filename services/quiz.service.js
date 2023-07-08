const Quizzes = require("../models/quiz.model");

class QuizService {
    async quizMetaData(email) {
        const quizzes = await Quizzes.find({ createdBy: email });
        const result = [];
        for (let i = 0; i < quizzes.length; i++) {
            const { numberOfQuestions, responses, quizName, createdAt, updatedAt, _id } = quizzes[i];
            result.push({
                questions: numberOfQuestions,
                responses, quizName, _id,
                createdAt: createdAt.toDateString(),
                updatedAt: updatedAt.toDateString()
            })
        }
        return result;
    }
}

module.exports = QuizService;