const router = require('express').Router();
const { postSignup, postSignupFromGoogle, postLogin,getQuizzes } = require('../controllers/user.controller');

router.post('/signup', async (req, res) => {
    const { password } = req.body;
    if (password) postSignup(req, res);
    else postSignupFromGoogle(req, res);
});

router.post('/login', postLogin);

router.get('/quizzes', getQuizzes);




module.exports = router;