const express = require("express");
const router = express.Router();
const { MulterController: controller } = require("../controllers");
const {
  singleupload,
  fieldsupload,
  arrayupload,
  videoupload,
} = require("../utils/multer");

router.get("/singlelist", controller.SingleList);
router.get("/fieldslist", controller.FieldsList);
router.get("/arraylist", controller.ArrayList);
router.get("/videolist", controller.VideoList);

router.post("/singleupload", singleupload, controller.SingleAdd);
router.post("/fieldsupload", fieldsupload, controller.FiedlsAdd);
router.post("/arrayupload", arrayupload, controller.ArrayAdd);
router.post("/videoupload", videoupload, controller.VideoAdd);
router.post("/delvideo", controller.VideoDel);

module.exports = router;
