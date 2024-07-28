const express = require('express');
const router = express.Router();
const { signup, login, profile } = require('../config/controllers/authController');
const { jwtAuthMiddleware } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', jwtAuthMiddleware, profile);

module.exports = router;
