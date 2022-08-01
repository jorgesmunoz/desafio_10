const express = require("express");
const productRouter = express.Router();

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", addProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
