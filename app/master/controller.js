const Admin = require('../admins/model');
const bcrypt = require('bcryptjs');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const admin = await Admin.find();

      res.render('admin/master/view-master', {
        admin,
        role: req.session.user.role,
        name: req.session.user.name,
        alert,
        title: 'Halaman Master',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/master');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/master/create', {
        name: req.session.user.name,
        title: 'Halaman Tambah Admin',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/master');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, email, phoneNumber, password, role } = req.body;
      const bcryptPassword = bcrypt.hashSync(password, 10);
      let admin = await Admin({
        name,
        email,
        phoneNumber,
        password: bcryptPassword,
        role,
      });
      await admin.save();

      req.flash('alertMessage', 'Berhasil tambah Admin');
      req.flash('alertStatus', 'success');

      res.redirect('/master');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/master');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const admin = await Admin.findOne({ _id: id });

      res.render('admin/master/edit', {
        admin,
        name: req.session.user.name,
        title: 'Halaman Ubah Admin',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/master');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber, password, role } = req.body;

      await Admin.findOneAndUpdate(
        {
          _id: id,
        },
        { name, email, phoneNumber, password, role },
      );

      req.flash('alertMessage', 'Berhasil Ubah Admin');
      req.flash('alertStatus', 'success');

      res.redirect('/master');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/master');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Admin.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil Hapus Admin');
      req.flash('alertStatus', 'success');

      res.redirect('/master');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/master');
    }
  },
  actionStatus: async (req, res) => {
    try {
      console.log('12312312312');
      const { id } = req.params;
      console.log(`${id} 123213123`);
      let admin = await Admin.findOne({ _id: id });
      console.log(`${admin} 23123`);

      let status = admin.status === 'Y' ? 'N' : 'Y';

      admin = await Admin.findOneAndUpdate(
        {
          _id: id,
        },
        { status },
      );

      req.flash('alertMessage', 'Berhasil Ubah Status');
      req.flash('alertStatus', 'success');

      res.redirect('/master');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/master');
    }
  },
};
