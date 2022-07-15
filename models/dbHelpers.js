const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  add,
  find,
};

async function add(product) {
  const [id] = await db("products").insert(product);

  return id;
}

function find() {
  const res = db("products");
  return res;
}
