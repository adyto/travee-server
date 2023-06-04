const mongoose = require('mongoose');

let photosSchema = mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   require: [true, 'Nama Photos harus diisi'],
    // },
    name: {
      type: String,
      ref: 'Product',
    },
    photos: [
      {
        subPhotos: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Photos', photosSchema);
