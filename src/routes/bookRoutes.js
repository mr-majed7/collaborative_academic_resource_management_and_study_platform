const express = require('express');
const router = express.Router({ mergeParams: true }); 


//controller import
const bookController = require('../controllers/BookC')


router.get("/:folder_id", bookController.renderBooks);

router.post("/:folder_id", bookController.createBook);





module.exports = router; 