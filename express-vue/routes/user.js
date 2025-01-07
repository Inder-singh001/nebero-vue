const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user');

userRouter.post('/user/add', userController.add);
userRouter.post('/user/delete/:id', userController.deleteUser);
userRouter.post('/user/update/:id', userController.update);
userRouter.get('/user', userController.detail);
userRouter.get('/user/:id', userController.user);

module.exports = userRouter;