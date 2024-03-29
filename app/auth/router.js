var express = require('express');
var router = express.Router();
const {
  signup,
  signin,
  requestPasswordReset,
  resetPassword,
} = require('./controller');
const multer = require('multer');
const os = require('os');

router.post('/signup', multer({ dest: os.tmpdir() }).single('image'), signup);
router.post('/signin', signin);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password/:id/:token', resetPassword);

module.exports = router;
