const express = require('express');
const router = express.Router();
const { MulterController : controller } = require('../controllers');
const multer = require('multer');
const upload = multer({ dest : './uploads'}).fields([{name:'img'},{name:'img2'}]);

router.use('/img', express.static('./uploads'));

router.get('/list', controller.List);
router.post('/upload', upload, controller.Add);


module.exports = router;