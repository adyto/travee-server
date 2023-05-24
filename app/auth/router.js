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
router.post('/request-reset', requestPasswordReset);
router.post('/password-reset/:token/:id', resetPassword);

module.exports = router;
