const express = require('express');
const router = express.Router([ mergeParams= true ]); 


//controller import
const lectureNotesController = require('../controllers/LectureNotesC')


router.get("/:folder_id", lectureNotesController.renderLectureNotes);

router.post("/:folder_id", lectureNotesController.createLectureNotes);





module.exports = router; 