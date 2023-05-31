var express = require('express');
const path = require('path');
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewCreateDays,
  actionCreateDays,
  viewEdit,
  actionEdit,
  actionDelete,
  actionStatus,
} = require('./controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const os = require('os');

const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => {
//       console.log(req.files);
//       // console.log("files " + file);
//       cb(
//         null,
//         req.files[0].fieldname +
//           '_' +
//           Date.now() +
//           path.extname(file.originalname),
//       );
//     },
//   }),
// });

router.get('/', index);
router.get('/create', viewCreate);
// router.post('/create', upload.array('image', 5), actionCreate);
router.post(
  '/create',
  multer({ dest: os.tmpdir() }).single('image'),
  actionCreate,
);
router.get('/create-day/:id', viewCreateDays);
router.post('/create-day/:id', actionCreateDays);
router.get('/edit/:id', viewEdit);
router.put(
  '/edit/:id',
  multer({ dest: os.tmpdir() }).single('image'),
  actionEdit,
);
router.delete('/delete/:id', actionDelete);
router.put('/status/:id', actionStatus);

module.exports = router;
