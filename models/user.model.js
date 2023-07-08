const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 40,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    image: {
        type: String,
        required: false
    },
    quizzes: [mongoose.Types.ObjectId]
})

const User = mongoose.model('users', schema);


module.exports = User;