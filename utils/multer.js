const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}_${file.originalname}`);
  },
});

const singleupload = multer({ storage: storage }).single("img");

const fieldsupload = multer({ storage: storage }).fields([
  { name: "img" },
  { name: "img2" },
]);

const arrayupload = multer({ storage: storage }).array("imgs", 12);

const videoupload = multer({ storage: storage }).single("video");

module.exports = { singleupload, fieldsupload, arrayupload, videoupload };
