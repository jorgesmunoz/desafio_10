/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const product1 = {
  title: "banana",
  description: "banana description",
  code: 500,
  picture: "https://www.iconfinder.com/search?q=lettuce&price=free",
  price: 100.5,
  stock: 500,
};

const product2 = {
  title: "apple",
  description: "manzana description",
  code: 500,
  picture: "https://www.iconfinder.com/search?q=lettuce&price=free",
  price: 600.0,
  stock: 500,
};

const product3 = {
  title: "orange",
  description: "orange description",
  code: 500,
  picture: "https://www.iconfinder.com/search?q=lettuce&price=free",
  price: 150.25,
  stock: 500,
};

const product4 = {
  title: "watermelon",
  description: "watermelon description",
  code: 500,
  picture: "https://www.iconfinder.com/search?q=lettuce&price=free",
  price: 55.35,
  stock: 500,
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert([product1, product2, product3, product4]);
};
