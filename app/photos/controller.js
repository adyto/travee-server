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
      console.log('xa');
      console.log(req.file);
      const subNew = {
        subPhotos: photo,
      };
      // await Photos.findOneAndUpdate({ _id: id }, { $push: { photos: subNew } });

      // req.flash('alertMessage', 'Berhasil tambah Photos');
      // req.flash('alertStatus', 'success');

      // res.redirect(`/photos/sub-photos/${viewPhotos._id}`);
    } catch (err) {
      const { id } = req.params;
      const viewPhotos = await Photos.findOne({ _id: id });
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect(`/photos/sub-photos/${viewPhotos._id}`);
    }
  },
  viewEditSubPhotos: async (req, res) => {
    try {
      const { id, photoId } = req.params;

      const photos = await Photos.findById(id);
      const res6 = photos.photos;
      const filterPhoto = res6.filter((r) => r._id == photoId);
      const subPhoto = filterPhoto[0];

      res.render('admin/photos/edit-sub-photos', {
        photos,
        subPhoto,
        name: req.session.user.name,
        title: `Halaman Edit Photo ${photos.name}`,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect();
    }
  },
  actionEditSubPhotos: async (req, res) => {
    try {
      const { id, photoId } = req.params;
      const { name } = req.body;
      console.log(id, photoId);
      console.log(name);

      const query = {
        _id: photoId,
        subPhotos: name,
      };
      console.log(query);

      // await Photos.findByIdAndUpdate(
      //   { _id: id, 'photos._id': `${photoId}` },
      //   {
      //     $set: {
      //       'photos.$.subPhotos': name,
      //     },
      //   },
      // );
      await Photos.findByIdAndUpdate(
        {
          _id: id,
          photos: { $elemMatch: { _id: photoId } },
        },
        {
          $set: { photos: query },
        },
      );
      // console.log(res1);

      console.log('x');
      req.flash('alertMessage', 'Berhasil Ubah product photo');
      req.flash('alertStatus', 'success');
      res.redirect(`/photos/sub-photos/${id}`);
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect(`/photos/sub-photos/${req.params.id}`);
    }
  },
  actionDeleteSubPhotos: async (req, res) => {
    try {
      const { id, photoId } = req.params;

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
