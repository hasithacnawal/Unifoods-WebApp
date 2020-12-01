const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CardSchema = new Schema({
  userId: {
    type: String
  },
  nameOnCard: {
    type: String
  },
  cardNumber: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  balance: {
    type: Number
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Card = mongoose.model("cards", CardSchema);
