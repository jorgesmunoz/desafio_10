const express = require("express");
const cartRouter = express.Router();

const {
  createCart,
  deleteCart,
  getCartProducts,
  addProductToCart,
  deleteProductFromCart,
} = require("../controllers/cart.js");

cartRouter.post("/", createCart);
cartRouter.delete("/:id", deleteCart);
cartRouter.get("/:id/products", getCartProducts);
cartRouter.post("/:id/products/:id_prod", addProductToCart);
cartRouter.delete("/:id/products/:id_prod", deleteProductFromCart);

module.exports = cartRouter;
