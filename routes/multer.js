const express = require("express");
const router = express.Router();
const { MulterController: controller } = require("../controllers");
const { singleupload, fieldsupload, arrayupload } = require("../utils/multer");

router.get("/singlelist", controller.SingleList);
router.get("/fieldslist", controller.FieldsList);
router.get("/arraylist", controller.ArrayList);

router.post("/singleupload", singleupload, controller.SingleAdd);
router.post("/fieldsupload", fieldsupload, controller.FiedlsAdd);
router.post("/arrayupload", arrayupload, controller.ArrayAdd);

module.exports = router;
