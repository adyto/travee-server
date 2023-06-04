const mongoose = require('mongoose');

let productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama Product harus diisi'],
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    thumbnail: {
      type: String,
    },
    thumbnail2: [
      {
        type: String,
      },
    ],
    ticket: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
    days: [
      {
        time: String,
        desc: String,
      },
    ],

    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
