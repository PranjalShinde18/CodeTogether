const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../config/controllers/taskController');
const { jwtAuthMiddleware } = require('../middleware/authMiddleware');

router.get('/', jwtAuthMiddleware, getTasks);
router.post('/', jwtAuthMiddleware, createTask);

module.exports = router;
