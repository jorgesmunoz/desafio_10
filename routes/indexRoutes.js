const express = require("express");
const productRouter = require("./products");
const cartRouter = require("./cart");
const indexRouter = express.Router();

indexRouter.use("/api/products", productRouter);
indexRouter.use("/api/cart", cartRouter);

module.exports = indexRouter;
