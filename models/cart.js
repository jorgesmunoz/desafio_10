const mongoose = require("mongoose");

const cartController = "cart";

const cartSchema = new mongoose.Schema({
  id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  products: { type: [{}], required: true },
});

const cart = new mongoose.model(cartController, cartSchema);

module.exports = { cart };
