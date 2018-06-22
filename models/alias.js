const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Alias', new Schema({
  alias: { type: String, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}));

