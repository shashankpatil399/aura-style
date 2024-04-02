const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/images');
    },
    filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      file.originalname = uniqueSuffix + ext;
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  module.exports= upload;