const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, '..'),
  serviceName: process.env.local.SERVICE_NAME,
  jwtKey: process.env.local.SECRET,
  urlDb: process.env.local.MONGO_URL,
};
