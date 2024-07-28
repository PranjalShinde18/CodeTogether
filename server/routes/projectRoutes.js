const express = require('express');
const router = express.Router();
const {
    createProject,
    joinProject,
    assignTask,
    getUserTasks,
    getCreatedProjects,
    getJoinedProjects,
    getProjects,
    getProjectTasks,
    getProjectById,
    changeTaskStatus
} =  require('../config/controllers/projectController');
const { jwtAuthMiddleware } = require('../middleware/authMiddleware');

router.post('/create', jwtAuthMiddleware, createProject);
router.post('/join', jwtAuthMiddleware, joinProject);
router.post('/:projectId/assign-task', jwtAuthMiddleware, assignTask);
router.get('/user-tasks', jwtAuthMiddleware, getUserTasks);
router.get('/created', jwtAuthMiddleware, getCreatedProjects);
router.get('/joined', jwtAuthMiddleware, getJoinedProjects);
router.get('/', getProjects);
router.get('/:projectId/tasks', getProjectTasks);
router.get('/:projectId', getProjectById);
router.patch('/:projectId/change-task-status/:taskId', jwtAuthMiddleware, changeTaskStatus); // New route


module.exports = router;
