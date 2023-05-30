const mongoose = require('mongoose');

let adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      default: [true, 'Email harus diisi'],
    },
    name: {
      type: String,
      default: [true, 'Nama harus diisi'],
    },
    password: {
      type: String,
      default: [true, 'Kata Sandi harus diisi'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    phoneNumber: {
      type: String,
      default: [true, 'Nomer Telpon harus diisi'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Admin', adminSchema);
