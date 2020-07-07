const express = require("express");
const connectToDB = require("./config/db");

const app = express();
connectToDB();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo desde el puerto ${PORT}`);
});
