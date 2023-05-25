const mongoose = require('mongoose');
const { urlDb } = require('../config');

mongoose.connect('mongodb+srv://adi:adi@travee.gwkg7e6.mongodb.net/db_travee', {
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;
