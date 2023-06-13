var express = require('express');
var router = express.Router();
const { bestWisata, detailProduct, bestAttraction } = require('./controller');

const { isLoginUser } = require('../middleware/auth');

router.get('/best-wisata', bestWisata);
router.get('/best-atraksi', bestAttraction);
router.get('/product/:id', detailProduct);

module.exports = router;
