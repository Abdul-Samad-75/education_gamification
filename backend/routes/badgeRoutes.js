const express = require('express');
const router = express.Router();
const {
    createBadge,
    getBadges,
    checkAndAwardBadges,
    getBadgeById,
    updateBadge,
    deleteBadge,
} = require('../controllers/badgeController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
    .post(protect,admin, createBadge)
    .get(protect, getBadges);

router.post('/check', protect, checkAndAwardBadges);

router.route('/:id')
    .get(protect, getBadgeById)
    .put(protect, admin, updateBadge)
    .delete(protect, admin, deleteBadge);

module.exports = router;
