const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  name: String,
  userID: { type: String, unique: true },
  TokenAccess: String,
  admin: Boolean,
}));
