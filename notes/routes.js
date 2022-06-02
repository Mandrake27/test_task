const express = require('express');

const { methods } = require('./noteModel');

const router = express.Router();

router.get('/notes', methods.getNotes);

router.get('/notes/:noteId', methods.getNote);

router.post('/notes/', methods.addNote);

router.post('/edit-note/:noteId', methods.editNote);

router.post('/delete-note/:noteId', methods.deleteNote);

module.exports = router;