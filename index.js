require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//Import routes
const userRoutes = require('./routes/user.routes');
const quizRoutes = require('./routes/quiz.routes');

//Middlewares
app.use(cors());
app.use(express.json());

//Mongoose connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log(`Successfully connected to the database...`)
}).catch((err) => {
    console.log(`Failed to connect to the database`);
})

//Routes
app.use('/user', userRoutes);
app.use('/quiz', quizRoutes);


//Error handler
app.use((err, req, res, next) => {
    res.status(err.status).json(err);
})

app.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}...`));

