const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { upload, remove } = require('../controllers/cloudinary')

//routes one for upload one for remove
router.post('/uploadimages', authCheck, adminCheck, upload);
//image would be removed one by one
router.post('/removeimage', authCheck, adminCheck, remove);

module.exports = router;