const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

let usersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email harus diisi'],
    },
    name: {
      type: String,
      require: [true, 'Nama harus diisi'],
      maxlength: [255, 'panjang nama harus di antara 3 - 255 karakter'],
      minlength: [3, 'panjang nama harus di antara 3 - 255 karakter'],
    },
    password: {
      type: String,
      require: [true, 'Kata Sandi harus diisi'],
      maxlength: [255, 'panjang password harus di antara 3 - 255 karakter'],
    },
    avatar: { type: String },
    // token: { type: String },
    phoneNumber: {
      type: String,
      require: [true, 'nomor telpon harus diisi'],
      maxlength: [13, 'panjang nomor telpon harus di antara 9 - 13 karakter'],
      minlength: [9, 'panjang nomor telpon harus di antara 9 - 13 karakter'],
    },
  },
  { timestamps: true },
);

usersSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('user').countDocuments({
        email: value,
      });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`,
);

usersSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model('user', usersSchema);
