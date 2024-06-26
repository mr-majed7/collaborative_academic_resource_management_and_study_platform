const express = require('express');
const router = express.Router([ mergeParams= true ]); 


//controller import
const slidesController = require('../controllers/slidesC')


router.get("/:folder_id", slidesController.renderSlide);

router.post("/:folder_id", slidesController.createSlide);





module.exports = router;