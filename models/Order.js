const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create itemsSchema
const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },

  qty: {
    type: Number,
    required: true,
    default: 0
  },
  info: {
    type: String
  },
  vegi: {
    type: Boolean,
    required: true,
    default: false
  },

  inCart: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});
//Create Order Schema
const OrderSchema = new Schema({
  oderNumber: {
    type: Number
  },
  amount: {
    type: String
  },
  items: [Object],
  type: {
    type: String
  },
  userId: {
    type: String
  },
  userRegNo: {
    type: String
  },
  cardNumber: {
    type: String
  },

  done: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
