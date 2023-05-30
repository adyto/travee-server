const mongoose = require('mongoose');

let ticketSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama ticket harus diisi'],
    },
    price: {
      type: Number,
      require: [true, 'Price ticket harus diisi'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Ticket', ticketSchema);
