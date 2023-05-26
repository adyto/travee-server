var express = require('express');
var router = express.Router();
const { viewSignIn, actionSingin, actionLogout } = require('./controller');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', viewSignIn);
router.post('/', actionSingin);
router.get('/logout', actionLogout);

module.exports = router;
