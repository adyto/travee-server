const Product = require('../product/model');
const Category = require('../category/model');
const User = require('./model');
const Ticket = require('../ticket/model');
const config = require('../../config');
const path = require('path');
const fs = require('fs');

module.exports = {
  bestWisata: async (req, res) => {
    try {
      const product = await Product.find()
        .select('_id name description status updatedAt')
        .populate('category')
        .populate('ticket')
        .populate('photo');

      const bestProduct = product.filter((r) =>
        r.category.some((c) => c.name === 'best-wisata'),
      );

      res.status(200).json({ data: bestProduct });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
  bestAttraction: async (req, res) => {
    try {
      const product = await Product.find()
        .select('_id name description status updatedAt')
        .populate('category')
        .populate('ticket')
        .populate('photo');

      const bestAttraction = product.filter((r) =>
        r.category.some((c) => c.name === 'best-atraksi'),
      );

      res.status(200).json({ data: bestAttraction });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
  detailProduct: async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id })
        .populate('category')
        .populate('ticket')
        .populate('photo');

      res.status(200).json({
        data: {
          detail: product,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal Server Error` });
    }
  },
  avatarUser: async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        console.log(filename);
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`,
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        // src.pipe(dest);
        const prevAvatar = await User.findOne({ _id: id });
        console.log(prevAvatar.avatar !== undefined);
        if (prevAvatar.avatar !== undefined) {
          // masukin upload baru
        }
        src.on('end', async () => {
          try {
            // const userID = { _id: id };
            // const resAvatar = { avatar: filename };
            // await User.findOneAndUpdate(userID, resAvatar, {
            //   new: true,
            //   upsert: true,
            //   rawResult: true, // Return the raw result from the MongoDB driver
            // });
          } catch (err) {
            if (err && err.name === 'ValidationError') {
              return res.status(422).json({
                error: 1,
                message: err.message,
                fields: err.errors,
              });
            }
            next(err);
          }
        });
      }
    } catch (err) {
      res.status(505).json({
        message: err.message || `Internal server error`,
      });
      next();
    }
  },
};
