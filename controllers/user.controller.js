const UserService = require('../services/user.service');
const { comparePasswords } = require('../utils/bcrypt');
const UserServiceInstance = new UserService();

const postSignup = async (req, res) => {
    try {
        console.warn('i should not be called')
        const { email, password } = req.body;
        if (!email || !password) {
            throw {
                message: "Email and password required",
                status: 400
            };
        } else {
            const exists = await UserServiceInstance.find(email);
            if (exists) throw {
                "message": "Email already exists",
                "status": 409

            }
            const user = await UserServiceInstance.signup(email, password);
            res.json(user);
        }
    } catch (error) {
        res.status(error.status).json(error);
    }
};


const postSignupFromGoogle = async (req, res) => {
    try {
        const { email, image } = req.body;
        if (!email) throw {
            message: "Email is required",
            status: 400
        }
        const exists = await UserServiceInstance.find(email);
        if (exists) throw {
            "message": "Email already exists",
            "status": 409

        }
        const user = await UserServiceInstance.signupFromGoogle(email, image);
        res.status(201).json({
            "message": `${user.email} created`,
            status: 201
        })
    } catch (error) {
        res.status(error.status).json(error);
    }
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserServiceInstance.find(email);
        if (user) {
            if (comparePasswords(password, user.password)) res.status(200).json(user);
            else {
                res.status(401).json({
                    "message": "Invaid credentials",
                    status: 409
                })
            }
        }
        else {
            res.status(401).json({
                "message": "Invaid credentials",
                status: 409
            })
        }
    } catch (error) {
        res.status(error.status).json(error);
    }
}

const getQuizzes = async (req, res) => {
    try {
        const { email } = req.query;
        console.log('reached');
        const quizzes = await UserServiceInstance.findQuizzes(email);
        res.json(quizzes);
    } catch (error) {
        console.log(error);
    }
}
module.exports = { postSignup, postSignupFromGoogle, postLogin, getQuizzes }