const express    =  require('express');
const noteRouter = express.Router();
const noteController = require('../controller/note');

noteRouter.post('/note/add', noteController.addNote);
noteRouter.post('/note/delete', noteController.deleteNote);
noteRouter.get('/note', noteController.listNotes);

module.exports =  noteRouter;