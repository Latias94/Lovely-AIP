const multer = require('multer');
const path = require('path');
const express = require('express');
const passport = require('passport');
const User = require('../../models/User');

const router = express.Router();

// Upload engine
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, callback) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname)
    .toLowerCase());
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
})
  .single('image');

/**
 * @swagger
 * /api/upload/avatar:
 *   post:
 *     tags:
 *       - User
 *     summary: Upload avatar for current user
 *     description: Upload avatar for current user. This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully send activate email
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No user found Or No File Selected!
 *     security:
 *       - JWT: []
 */
router.post('/avatar', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(404)
        .json({ msg: err });
    } else if (req.file === undefined) {
      return res.status(404)
        .json({ msg: 'Error: No File Selected!' });
    } else {
      // console.log(req.file);
      try {
        const user = await User.findById(req.user.id);
        if (user) {
          user.avatar = `/uploads/${req.file.filename}`;
          const currentUser = await user.save();
          return res.json(currentUser);
        } else {
          return res.status(404)
            .json({ usernotfound: 'No user found' });
        }
      } catch (error) {
        return res.status(404)
          .json({ usernotfound: 'No user found' });
      }
    }
  });
});

module.exports = router;
