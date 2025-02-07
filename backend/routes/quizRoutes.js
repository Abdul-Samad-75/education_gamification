const express = require('express');
const router = express.Router();
const {
    createQuiz,
    getQuizzes,
    getQuizById,
    submitQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizResults,
} = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');
const { createQuizValidator, submitQuizValidator } = require('../validators/quizValidators');

router.route('/')
    .post(protect, admin, createQuizValidator, validateRequest, createQuiz)
    .get(protect, getQuizzes)
    .put(protect, admin, createQuizValidator, validateRequest, updateQuiz)
    .delete(protect, admin, deleteQuiz);

router.route('/:id')
    .get(protect, getQuizById);

router.route('/:id/submit')
    .post(protect, submitQuizValidator, validateRequest, submitQuiz);

router.route('/:id/results')
    .get(protect, getQuizResults);

module.exports = router;
