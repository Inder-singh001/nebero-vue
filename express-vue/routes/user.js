const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user');

userRouter.post('/user/login', userController.login);

userRouter.post('/user/add', userController.add);
userRouter.delete('/user/delete', userController.deleteUser);
userRouter.put('/user/update', userController.update);
userRouter.get('/user', userController.detail);
userRouter.get('/user/one', userController.user);
userRouter.post('/user/signup', userController.signup);
userRouter.post('/user/logout', userController.logout);

module.exports = userRouter;