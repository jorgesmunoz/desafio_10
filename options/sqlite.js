const options = {
  client: "sqlite3",
  connection: {
    filename: "./database/db.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = {
  options,
};
