const mongoose = require('mongoose');

const subSchemaTicket = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

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
      // {
      //   day2: {
      //     time: String,
      //     desc: String,
      //   },
      // },
      // {
      //   day3: {
      //     time: String,
      //     desc: String,
      //   },
      // },
      // {
      //   day4: {
      //     time: String,
      //     desc: String,
      //   },
      // },
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
