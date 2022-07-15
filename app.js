const Contenedor = require("./contenedor.js");
const express = require("express");
const { engine } = require("express-handlebars");
const { options } = require("./options/sqlite");
const knex = require("knex")(options);

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

let product = new Contenedor("productos.txt");

let userChatMessages = [];

const PORT = 8080;
let cont = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.set("socketio", io);

app.get("/productos", (req, res) => {
  res.render("datos");
});

// Db creation
(async () => {
  try {
    const tableExists = await knex.schema.hasTable("products");
    console.log(`tableExists: ${tableExists}`);
    console.log(knex);
    if (tableExists) {
      await knex("products").del();
    } else {
      await knex.schema.createTable("products", (table) => {
        table.increments("id");
        table.string("title", 30).notNullable();
        table.string("description", 30);
        table.float("price", 2);
        table.timestamps("created_at");
        table.integer("code");
        table.string("picture").notNullable();
        table.integer("stock");
        // table.uuid("id").primary();
      });
    }
  } catch (error) {
    console.log({ error: error });
  }
})();

io.on("connection", async (channel) => {
  cont++;
  channel.on("incomingProduct", async (producto) => {
    console.log("Entro a channel on");
    await product.save({ title: producto.title, price: producto.price });
    const ans = await product.getAll();
    io.sockets.emit("productList", ans);
  });

  channel.on("newUserMessage", (newMessage) => {
    userChatMessages.push(newMessage);
    io.sockets.emit("messages", userChatMessages);
  });

  const ans = await product.getAll();
  if (ans !== 0) {
    channel.emit("productList", ans);
  }

  channel.emit("messages", userChatMessages);

  console.log(`Connection N°: ${cont}`);
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
