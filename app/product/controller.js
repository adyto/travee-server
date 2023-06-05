const Product = require('./model');
const Category = require('../category/model');
const Ticket = require('../ticket/model');
const Photo = require('../photos/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const product = await Product.find()
        .populate('category')
        .populate('ticket')
        .populate('photo');

      console.log(product);
      res.render('admin/product/view-product', {
        product,
        alert,
        name: req.session.user.name,
        title: 'Halaman Product',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const ticket = await Ticket.find();
      const photo = await Photo.find();
      res.render('admin/product/create', {
        category,
        ticket,
        photo,
        name: req.session.user.name,
        title: 'Halaman Tambah Product',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, ticket, photo } = req.body;

      const product = new Product({
        name,
        category,
        ticket,
        photo,
      });

      await product.save();

      req.flash('alertMessage', 'Berhasil tambah product');
      req.flash('alertStatus', 'success');

      res.redirect('/product');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  viewCreateDays: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id });

      res.render('admin/product/create-day', {
        product,
        name: req.session.user.name,
        title: 'Halaman Create Days',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  actionCreateDays: async (req, res) => {
    try {
      const { time, desc } = req.body;

      const product = new Product({
        days: {
          time,
          desc,
        },
      });

      await product.save();

      req.flash('alertMessage', 'Berhasil tambah hari');
      req.flash('alertStatus', 'success');

      res.redirect('/product');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.find();
      const ticket = await Ticket.find();
      const photo = await Photo.find();
      const product = await Product.findOne({ _id: id })
        .populate('category')
        .populate('ticket')
        .populate('photo');

      console.log(product);

      res.render('admin/product/edit', {
        product,
        ticket,
        photo,
        category,
        name: req.session.user.name,
        title: 'Halaman Ubah Product',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, ticket, photo } = req.body;

      await Product.findOneAndUpdate(
        {
          _id: id,
        },
        {
          name,
          category,
          ticket,
          photo,
        },
      );

      req.flash('alertMessage', 'Berhasil ubah Product');
      req.flash('alertStatus', 'success');

      res.redirect('/product');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findOneAndRemove({
        _id: id,
      });

      let currentImage = `${config.rootPath}/public/uploads/${product.thumbnail}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash('alertMessage', 'Berhasil Hapus Product');
      req.flash('alertStatus', 'success');

      res.redirect('/product');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let product = await Product.findOne({ _id: id });

      let status = product.status === 'Y' ? 'N' : 'Y';

      product = await Product.findOneAndUpdate(
        {
          _id: id,
        },
        { status },
      );

      req.flash('alertMessage', 'Berhasil Ubah Status');
      req.flash('alertStatus', 'success');

      res.redirect('/product');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
};
