const Admin = require('../admins/model');

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
      const admin = await Admin.find();
      res.sender('admin/master/create', {
        admin,
        name: req.session.user.name,
        title: 'Halaman Tambah Admin',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/master');
    }
  },
};
