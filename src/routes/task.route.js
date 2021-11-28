const express = require('express');

const router = express.Router();

const TaskController = require('../controllers/task.controller');

const verifyAuthToken = require('../middleware/auth.middleware');

router.post('/', verifyAuthToken, TaskController.createTask);

router.get('/', verifyAuthToken, TaskController.getAllTasks);

router.get('/:id', verifyAuthToken, TaskController.getSingleTask);

router.patch('/:id', verifyAuthToken, TaskController.updateTask);

router.delete('/:id', verifyAuthToken, TaskController.deleteTask);

module.exports = router;
