const mongoose = require('mongoose');

const Cake = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  flavor: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model('cakes', Cake);
