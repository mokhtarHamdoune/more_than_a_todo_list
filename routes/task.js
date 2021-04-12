var express = require('express');
var task_controller = require('../controllers/task_controller');
var router = express.Router();
// body-parser middleware
var bodyPaser = express.json();

router.get('/tasks',task_controller.getTasksList);

router.post('/tasks',bodyPaser,task_controller.addTask);

router.delete('/tasks',bodyPaser,task_controller.deleteTask);

module.exports = router;