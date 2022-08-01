const uuid = require("uuid");
const { cart } = require("../models/cart");
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

const createCart = async (req, res) => {
  const newCart = {
    id: uuid.v4(),
    timestamp: Date.now(),
    products: [],
  };
  try {
    const response = await cart.create(newCart);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await cart.deleteOne({ id: id });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await cart.find({ id: id }, ["products", "-_id"]);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).json({ error: "cart not found" });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const product = await knex("products").where("id", "=", id_prod);
    const response = await cart.updateOne(
      { id: id },
      { $push: { products: product } }
    );
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const product = await knex("products").where("id", "=", id_prod);
    const response = await cart.updateOne(
      { id: id },
      { $pull: { products: product } }
    );
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = {
  createCart,
  deleteCart,
  getCartProducts,
  addProductToCart,
  deleteProductFromCart,
};
