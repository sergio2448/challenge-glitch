const express = require("express");
const { Container } = require("./contenedor");

const PORT = process.env.PORT || 8080;

const app = express();

let container = new Container("products.json");

app.get("/products", async (req, res) => {
  let products = await container.getAll();
  res.send(products);
});

app.get("/randomProduct", async (req, res) => {
  let products = await container.getAll();
  let productsJson = JSON.parse(products);
  let randomIndex = Math.floor(Math.random() * productsJson.length);
  let randomProduct = productsJson[randomIndex];
  res.send(randomProduct);
});

const connectedServer = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(error.message);
});
