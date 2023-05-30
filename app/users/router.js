var express = require('express');
var router = express.Router();
const { bestWisata } = require('./controller');

const { isLoginUser } = require('../middleware/auth');

router.get('/best-wisata', bestWisata);

module.exports = router;
