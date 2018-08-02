const multer = require('multer');
const path = require('path');
const express = require('express');

const router = express.Router();

// Upload engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, callback) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // check mimeType
  const mimeType = fileTypes.test(file.mimeType);
  if (mimeType && extName) {
    return callback(null, true);
  } else {
    return callback('Error: Image Only');
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  },
}).single('image');


router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(404).json({
        msg: err,
      });
    }
    console.log(req.file);
    return true;
  });
});
