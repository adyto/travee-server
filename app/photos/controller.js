const mongoose = require('mongoose');
const Photos = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const photos = await Photos.find();
      res.render('admin/photos/view-photos', {
        photos,
        alert,
        name: req.session.user.name,
        title: 'Halaman Photos',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/photos');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/photos/create', {
        name: req.session.user.name,
        title: 'Halaman Tambah Photos',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/photos');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let photos = await Photos({ name });
      await photos.save();

      req.flash('alertMessage', 'Berhasil tambah Photos');
      req.flash('alertStatus', 'success');

      res.redirect('/photos');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/photos');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const photos = await Photos.findOne({ _id: id });

      res.render('admin/photos/edit', {
        photos,
        name: req.session.user.name,
        title: 'Halaman Edit Ticket',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/ticket');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Photos.findOneAndUpdate({ _id: id }, { $set: { name: name } });

      req.flash('alertMessage', 'Berhasil Ubah product photo');
      req.flash('alertStatus', 'success');

      res.redirect('/photos');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/photos');
    }
  },
  viewPhotos: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const { id } = req.params;

      const photos = await Photos.findOne({ _id: id });
      const resPhoto = photos.photos;
      res.render('admin/photos/view-sub-photos', {
        photos,
        resPhoto,
        alert,
        name: req.session.user.name,
        title: photos.name,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/photos');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Photos.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil Hapus product photo');
      req.flash('alertStatus', 'success');

      res.redirect('/photos');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/photos');
    }
  },
  viewCreateSubPhotos: async (req, res) => {
    try {
      const { id } = req.params;
      const photos = await Photos.findOne({ _id: id });

      res.render('admin/photos/create-sub-photos', {
        photos,
        name: req.session.user.name,
        title: 'Halaman Tambah Sub Photos',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/sub-photos');
    }
  },
  actionCreateSubPhotos: async (req, res) => {
    try {
      const { photo } = req.body;
      const { id } = req.params;
      const viewPhotos = await Photos.findOne({ _id: id });

      //   let addPhotos = await Photos({ photos: [{ subPhoto: photo }] });
      //   await addPhotos.save();
      const subNew = {
        subPhotos: photo,
      };
      await Photos.findOneAndUpdate(
        { _id: id },
        // { $push: { photos: [{ subPhoto: photo }] } },
        { $push: { photos: subNew } },
      );

      req.flash('alertMessage', 'Berhasil tambah Photos');
      req.flash('alertStatus', 'success');

      res.redirect(`/photos/sub-photos/${viewPhotos._id}`);
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/sub-photos');
    }
  },
  viewEditSubPhotos: async (req, res) => {
    try {
      const { id, photoId } = req.params;
      console.log(123123);
      console.log(id);
      console.log(photoId);

      const photos = await Photos.findOne({ _id: id });

      res.render('admin/photos/edit-sub-photos', {
        photos,
        name: req.session.user.name,
        title: 'Halaman Edit Ticket',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/ticket');
    }
  },
  actionEditSubPhotos: async (req, res) => {},
  actionDeleteSubPhotos: async (req, res) => {
    try {
      const { id, photoId } = req.params;
      console.log(id);
      console.log(photoId);
      await Photos.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $pull: {
            photos: {
              _id: photoId,
            },
          },
        },
      );
      // const res = await Photos.find({
      //   photos: {
      //     $elemMatch: {
      //       _id: id,
      //     },
      //   },
      // });

      req.flash('alertMessage', 'Berhasil Hapus kategori');
      req.flash('alertStatus', 'success');

      res.redirect(`/photos/sub-photos/${id}`);
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/ticket');
    }
  },
};
