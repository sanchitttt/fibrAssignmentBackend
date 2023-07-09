const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    id: String,
    question: {
        type: String,
        required: true
    },
    yes: String,
    no: String,
    correct: String,
    type: {
        type: String,
        enum: ["Multiple Choice", "Short Text", "Long Text", "Yes/No"],
        required: true
    },
    required: {
        type: Boolean,
        required: true
    },
    maxCharacters: Boolean,
    maxCharactersLength: {
        type: Number,
        default: null
    },
    choices: [String],
    correctChoice: String,
    createdBy: String,
    responses: {
        type: Number,
        default: 0
    },
    createdAt: Date,
    updatedAt: Date
})


const answerSchema = new mongoose.Schema({
    type: String,
    answer: String
})
const responseSchema = new mongoose.Schema({
    answers: [answerSchema],
    scoreGained: Number,
    submittedBy: String
})

const quizSchema = new mongoose.Schema({
    quizName: String,
    createdBy: String,
    createdAt: Date,
    updatedAt: Date,
    numberOfQuestions: {
        type: Number,
        default: 0
    },
    responses: Number,
    questions: {
        type: [questionSchema],
        default: []
    },
    responsesDetails: {
        type: [[responseSchema]],
        default: []
    },
})



const Quizzes = mongoose.model('quizzes', quizSchema);


module.exports = Quizzes;