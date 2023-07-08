const Quizzes = require('../models/quiz.model');
const QuizService = require('./quiz.service');
const QuizServiceInstance = new QuizService();
const User = require('../models/user.model');
const { encryptPassword } = require('../utils/bcrypt');

class UserService {
    async findQuizzes(email) {
        const quizzes = await QuizServiceInstance.quizMetaData(email);
        return quizzes;

    }
    async createNewQuiz(quizData) {
        try {
            const { createdBy } = quizData;
            const newQuiz = await Quizzes.create(quizData);
            await User.findOneAndUpdate({ email: createdBy }, {
                $push: {
                    'quizzes': newQuiz._id.toString()
                }
            })
            return newQuiz;
        } catch (error) {
            console.log(error);
        }

    }
    async find(email) {
        try {
            const user = await User.findOne({ email: email });
            if (user) return user;
            return user;
        } catch (error) {
            throw error;
        }
    }
    async signupFromGoogle(email, image) {
        try {
            const newUser = await User.create({
                email: email,
                image: image,
            })
            return newUser;
        } catch (error) {
            throw error;
        }
    }
    async signup(email, password) {
        try {
            const hashedPassword = encryptPassword(password);
            const newUser = await User.create({
                email: email,
                password: hashedPassword
            })
            return newUser;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = UserService;