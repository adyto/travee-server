const mongoose = require('mongoose');

let productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama Product harus diisi'],
    },
    description: {
      type: String,
      require: [true, 'Description haru diisi '],
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    ticket: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    photo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photos',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
