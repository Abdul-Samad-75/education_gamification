const asyncHandler = require('express-async-handler');
const Quiz = require('../models/quizModel');
const User = require('../models/userModel');
const Achievement = require('../models/achievementModel');

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private
const createQuiz = asyncHandler(async (req, res) => {
    const { title, description, subject, difficulty, timeLimit, points, questions } = req.body;

    if (!title || !description || !subject || !difficulty || !timeLimit || !points || !questions) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const quiz = await Quiz.create({
        title,
        description,
        subject,
        difficulty,
        timeLimit,
        points,
        questions,
        creator: req.user.id
    });

    res.status(201).json(quiz);
});

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
const getQuizzes = asyncHandler(async (req, res) => {
    const { subject, difficulty } = req.query;
    const filter = { active: true };

    if (subject) filter.subject =new RegExp(subject, 'i');;
    if (difficulty) filter.difficulty = difficulty;

    const quizzes = await Quiz.find(filter)
        .populate('creator', 'name')
        .select('-questions.options.isCorrect');

    res.json(quizzes);
});

// @desc    Get quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id)
        .populate('creator', 'name')
        .select('-questions.options.isCorrect');

    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404);
        throw new Error('Quiz not found');
    }
});

// @desc    Submit quiz attempt
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuiz = asyncHandler(async (req, res) => {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    // Calculate score
    let score = 0;
    answers.forEach((answer, index) => {
        const correctOption = quiz.questions[index].options.find(opt => opt.isCorrect);
        if (correctOption && answer === correctOption.text) {
            score++;
        }
    });

    const scorePercentage = (score / quiz.questions.length) * 100;
    const pointsEarned = Math.round((scorePercentage / 100) * quiz.points);

    // Update user's progress
    const user = await User.findById(req.user.id);
    user.points += pointsEarned;
    user.completedQuizzes.push({
        quiz: quiz._id,
        score: scorePercentage,
        completedAt: Date.now()
    });

    // Check for level up
    const oldLevel = user.level;
    user.level = Math.floor(user.points / 1000) + 1;

    await user.save();

    // Create achievement for quiz completion
    await Achievement.create({
        user: req.user.id,
        type: 'QUIZ_COMPLETION',
        details: {
            quiz: quiz._id,
            points: pointsEarned
        }
    });

    // If user leveled up, create achievement
    if (user.level > oldLevel) {
        await Achievement.create({
            user: req.user.id,
            type: 'LEVEL_UP',
            details: {
                level: user.level,
                points: user.points
            }
        });
    }

    res.json({
        score: scorePercentage,
        pointsEarned,
        newTotalPoints: user.points,
        level: user.level
    });
});


// @desc    Get quiz results
// @route   GET /api/quizzes/:id/results
// @access  Private
const getQuizResults = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    const userResults = await User.findById(req.user.id)
        .select('completedQuizzes')
        .populate({
            path: 'completedQuizzes.quiz',
            match: { _id: req.params.id }
        });

    const quizAttempt = userResults.completedQuizzes.find(
        attempt => attempt.quiz && attempt.quiz._id.toString() === req.params.id
    );

    if (!quizAttempt) {
        res.status(404);
        throw new Error('No results found for this quiz');
    }

    res.json({
        score: quizAttempt.score,
        completedAt: quizAttempt.completedAt,
        quizTitle: quiz.title,
        totalQuestions: quiz.questions.length
    });
});

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
const updateQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    // Check if user is admin or quiz creator
    if (quiz.creator.toString() !== req.user.id && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to update this quiz');
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
    );

    res.json(updatedQuiz);
});

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
const deleteQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        res.status(404);
        throw new Error('Quiz not found');
    }

    // Check if user is admin or quiz creator
    if (quiz.creator.toString() !== req.user.id && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to delete this quiz');
    }

    await quiz.remove();

    res.json({ message: 'Quiz removed' });
});

module.exports = {
    createQuiz,
    getQuizzes,
    getQuizById,
    submitQuiz,
    getQuizResults,
    updateQuiz,
    deleteQuiz

};
