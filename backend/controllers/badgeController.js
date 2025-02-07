const asyncHandler = require('express-async-handler');
const Badge = require('../models/badgeModel');
const User = require('../models/userModel');
const Achievement = require('../models/achievementModel');

// @desc    Create new badge
// @route   POST /api/badges
// @access  Private/Admin
const createBadge = asyncHandler(async (req, res) => {
    const { name, description, icon, criteria, points, rarity } = req.body;

    if (!name || !description || !icon || !criteria || !points || !rarity) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const badge = await Badge.create({
        name,
        description,
        icon,
        criteria,
        points,
        rarity
    });

    res.status(201).json(badge);
});

// @desc    Get all badges
// @route   GET /api/badges
// @access  Private
const getBadges = asyncHandler(async (req, res) => {
    const badges = await Badge.find({ active: true });
    res.json(badges);
});

// @desc    Get badge by ID
// @route   GET /api/badges/:id
// @access  Private
const getBadgeById = asyncHandler(async (req, res) => {
    const badge = await Badge.findById(req.params.id);

    if (badge) {
        res.json(badge);
    } else {
        res.status(404);
        throw new Error('Badge not found');
    }
});

// @desc    Get user badges
// @route   GET /api/badges/user
// @access  Private
const getUserBadges = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate('badges');
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json(user.badges);
});

// @desc    Update badge
// @route   PUT /api/badges/:id
// @access  Private/Admin
const updateBadge = asyncHandler(async (req, res) => {
    const badge = await Badge.findById(req.params.id);

    if (!badge) {
        res.status(404);
        throw new Error('Badge not found');
    }

    const updatedBadge = await Badge.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
    );

    res.json(updatedBadge);
});

// @desc    Delete badge
// @route   DELETE /api/badges/:id
// @access  Private/Admin
const deleteBadge = asyncHandler(async (req, res) => {
    const badge = await Badge.findById(req.params.id);

    if (!badge) {
        res.status(404);
        throw new Error('Badge not found');
    }

    await badge.remove();

    // Remove badge from all users who have it
    await User.updateMany(
        { badges: badge._id },
        { $pull: { badges: badge._id } }
    );

    res.json({ message: 'Badge removed' });
});

// @desc    Check and award badges
// @route   POST /api/badges/check
// @access  Private
const checkAndAwardBadges = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate('badges')
        .populate({
            path: 'completedQuizzes.quiz',
            select: 'subject difficulty'
        });

    const allBadges = await Badge.find({ active: true });
    const newBadges = [];

    for (const badge of allBadges) {
        // Skip if user already has this badge
        if (user.badges.some(b => b._id.toString() === badge._id.toString())) {
            continue;
        }

        let qualified = false;
        const { type, value, subject, difficulty } = badge.criteria;

        switch (type) {
            case 'QUIZ_SCORE':
                qualified = user.completedQuizzes.some(quiz => {
                    return quiz.score >= value &&
                        (!subject || quiz.quiz.subject === subject) &&
                        (!difficulty || quiz.quiz.difficulty === difficulty);
                });
                break;

            case 'QUIZ_COUNT':
                const filteredQuizzes = user.completedQuizzes.filter(quiz => {
                    return (!subject || quiz.quiz.subject === subject) &&
                        (!difficulty || quiz.quiz.difficulty === difficulty);
                });
                qualified = filteredQuizzes.length >= value;
                break;

            case 'POINTS':
                qualified = user.points >= value;
                break;

            case 'STREAK':
                // Implementation for streak logic
                const streakCount = calculateStreak(user.completedQuizzes);
                qualified = streakCount >= value;
                break;
        }

        if (qualified) {
            newBadges.push(badge);
            user.badges.push(badge._id);
            user.points += badge.points;

            // Create achievement for badge earned
            await Achievement.create({
                user: user._id,
                type: 'BADGE_EARNED',
                details: {
                    badge: badge._id,
                    points: badge.points
                }
            });
        }
    }

    if (newBadges.length > 0) {
        await user.save();
        res.json({
            newBadges,
            pointsEarned: newBadges.reduce((sum, badge) => sum + badge.points, 0),
            totalPoints: user.points
        });
    } else {
        res.json({ message: 'No new badges earned' });
    }
});

// Helper function to calculate streak
const calculateStreak = (completedQuizzes) => {
    if (completedQuizzes.length === 0) return 0;

    const sortedQuizzes = completedQuizzes
        .sort((a, b) => b.completedAt - a.completedAt);

    let streak = 1;
    let currentDate = new Date(sortedQuizzes[0].completedAt);

    for (let i = 1; i < sortedQuizzes.length; i++) {
        const quizDate = new Date(sortedQuizzes[i].completedAt);
        const diffDays = Math.floor((currentDate - quizDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            streak++;
            currentDate = quizDate;
        } else {
            break;
        }
    }

    return streak;
};

module.exports = {
    createBadge,
    getBadges,
    checkAndAwardBadges,
    getBadgeById,
    getUserBadges,
    updateBadge,
    deleteBadge
};
