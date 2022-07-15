const socket = io();

const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const userEmail = document.getElementById("user-email");
const userMensaje = document.getElementById("user-mensaje");
const prodList = document.getElementById("products-list");

document.getElementById("postButton").addEventListener("click", () => {
  if (!titleInput.value) {
    return alert("Debe ingresar un producto");
  }

  if (!priceInput.value) {
    return alert("Debe ingresar el precio");
  }

  const product = {
    title: titleInput.value,
    price: priceInput.value,
  };

  console.log(product);

  socket.emit("incomingProduct", product);
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  titleInput.focus();
});

document.getElementById("enviar-mensaje").addEventListener("click", () => {
  if (!userEmail.value) {
    return alert("Debe ingresar un email");
  }

  if (!userMensaje.value) {
    return alert("Debe ingresar un mensaje");
  }

  let currentDate = new Date().toJSON().slice(0, 19).replace("T", " ");
  console.log(currentDate);

  const userMessage = {
    email: userEmail.value,
    message: userMensaje.value,
    date: currentDate,
  };

  console.log(userMessage);

  socket.emit("newUserMessage", userMessage);
  userEmail.value = "";
  userMensaje.value = "";
  userEmail.focus();
});

socket.on("productList", (products) => {
  console.log(products);

  const listProducts = Object.values(products)
    .map((product) => {
      return `
      <tr align="center">
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      </tr>
      `;
    })
    .join(" ");

  console.log(listProducts);

  document.getElementById("products-list").innerHTML = listProducts;
});

socket.on("messages", (param) => {
  console.log(param);
  let text = "";

  param.forEach((element) => {
    text += `${element.email} <font color=red>[${element.date}] </font><font color=green>${element.message}</font> <br />`;
  });
  document.getElementById("message-email").innerHTML = text;
});
