const express = require('express');
const todoRouter = express.Router();
const todoController = require('../controller/todo');

todoRouter.post('/todo/add', todoController.addTask);
todoRouter.post('/todo/delete', todoController.deleteTask);
todoRouter.get('/todo', todoController.listTasks);

module.exports = todoRouter;