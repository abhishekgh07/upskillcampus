const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, required: true },
  price:       { type: String, required: true },
  description: { type: String },
  merchant:    { type: String }
});

module.exports = mongoose.model('Service', serviceSchema);