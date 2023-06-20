var express = require('express');
var router = express.Router();
const {
  bestWisata,
  detailProduct,
  bestAttraction,
  avatarUser,
} = require('./controller');
const multer = require('multer');
const os = require('os');

const { isLoginUser } = require('../middleware/auth');

router.get('/best-wisata', bestWisata);
router.get('/best-atraksi', bestAttraction);
router.get('/product/:id', detailProduct);
router.post(
  '/:id/avatar',
  multer({ dest: os.tmpdir() }).single('image'),
  avatarUser,
);

module.exports = router;
