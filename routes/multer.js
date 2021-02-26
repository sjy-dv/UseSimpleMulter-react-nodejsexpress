const express = require('express');
const router = express.Router();
const { MulterController : controller } = require('../controllers');
const { upload } = require('../utils/multer');

router.get('/list', controller.List);
router.post('/upload', upload, controller.Add);


module.exports = router;