var express = require('express');
var router = express.Router();
const { index } = require('./controller');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);

router.use('/', index);

module.exports = router;
