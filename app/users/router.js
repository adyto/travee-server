var express = require('express');
var router = express.Router();
const { bestWisata, detailProduct } = require('./controller');

const { isLoginUser } = require('../middleware/auth');

router.get('/best-wisata', bestWisata);
router.get('/product/:id', detailProduct);

module.exports = router;
