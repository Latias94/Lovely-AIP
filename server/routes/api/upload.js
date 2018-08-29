const multer = require('multer');
const path = require('path');
const express = require('express');

const router = express.Router();

// Upload engine
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, callback) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // check mimeType
  const mimeType = fileTypes.test(file.mimetype);
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


router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(404).json({
        msg: err,
      });
    } else if (req.file === undefined) {
      return res.status(404).json({
        msg: 'Error: No File Selected!'
      });
    } else {
      // console.log(req.file);
      return res.json({
        success: true,
        file: `public/uploads/${req.file.filename}`
      });
    }
  });
});

module.exports = router;
