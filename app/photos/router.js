var express = require('express');
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  viewPhotos,
  viewCreateSubPhotos,
  actionCreateSubPhotos,
  viewEditSubPhotos,
  actionEditSubPhotos,
  actionDeleteSubPhotos,
} = require('./controller');

const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);

router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

router.get('/sub-photos/:id', viewPhotos);
router.get('/sub-photos/:id/create', viewCreateSubPhotos);
router.post('/sub-photos/:id/create', actionCreateSubPhotos);
router.get('/sub-photos/edit/:id/:photoId', viewEditSubPhotos);
// router.put('/sub-photos/edit/:id/:photoId', actionEditSubPhotos);
router.delete('/sub-photos/delete/:id/:photoId', actionDeleteSubPhotos);

module.exports = router;
