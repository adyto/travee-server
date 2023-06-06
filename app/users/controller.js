const Product = require('../product/model');
const Category = require('../category/model');
const Ticket = require('../ticket/model');

module.exports = {
  bestWisata: async (req, res) => {
    try {
      const product = await Product.find()
        .select('_id name description status updateAt')
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
};
