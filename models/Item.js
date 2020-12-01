const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
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

module.exports = Item = mongoose.model("items", ItemSchema);
