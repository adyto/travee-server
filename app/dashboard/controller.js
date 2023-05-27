module.exports = {
  index: async (req, res) => {
    try {
      res.render('admin/dashboard/view-dashboard', {
        name: req.session.user.name,
        title: 'Halaman Dashboard',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
