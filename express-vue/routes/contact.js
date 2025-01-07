const express = require('express');
const contactRouter = express.Router();
const contactController = require('../controller/contact');

contactRouter.post('/contact', contactController.sendMessage);
contactRouter.get('/contactlist', contactController.listFeedbacks);
module.exports = contactRouter;