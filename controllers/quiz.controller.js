const UserService = require('../services/user.service');
const UserServiceInstance = new UserService();

const postCreateQuiz = async (req, res) => {
    try {
        const newQuiz = await UserServiceInstance.createNewQuiz(req.body);
        res.status(200).json(newQuiz);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { postCreateQuiz }