/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id", { primaryKey: true });
    table.string("title", 30).notNullable();
    table.string("description", 255);
    table.float("price").notNullable();
    table.integer("code");
    table.string("picture");
    table.integer("stock");
    table.timestamps(false, false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
