const Ticket = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const ticket = await Ticket.find();
      res.render('admin/ticket/view-ticket', {
        ticket,
        alert,
        name: req.session.user.name,
        title: 'Halaman Ticket',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/ticket');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/ticket/create', {
        name: req.session.user.name,
        title: 'Halaman Tambah Ticket',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/ticket');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, price } = req.body;

      let ticket = await Ticket({ name, price });
      await ticket.save();

      req.flash('alertMessage', 'Berhasil tambah Ticket');
      req.flash('alertStatus', 'success');

      res.redirect('/ticket');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/ticket');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const ticket = await Ticket.findOne({ _id: id });

      res.render('admin/ticket/edit', {
        ticket,
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
      const { name, price } = req.body;

      await Ticket.findOneAndUpdate(
        {
          _id: id,
        },
        { name, price },
      );

      req.flash('alertMessage', 'Berhasil Ubah kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/ticket');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/ticket');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Ticket.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil Hapus kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/ticket');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/ticket');
    }
  },
};
