const express = require("express");
const Products = require("./models/dbHelpers");

const server = express();

server.use(express.json());

const PORT = 8000;

server.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

server.post("/api/products", (req, res) => {
  const newPost = req.body;
  console.log(newPost);

  const { title, description, price, code, picture, stock } = req.body;
  console.log(title);
  try {
    Products.add(newPost);
    res.status(200).json(newPost);
  } catch {
    res.status(500).json({ message: "cannot add product" });
  }
});

server.get("/api/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Unable to retrieve products" });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
