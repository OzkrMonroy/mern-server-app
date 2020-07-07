const express = require("express");
const connectToDB = require("./config/db");

const app = express();
connectToDB();

const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: true }));

app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo desde el puerto ${PORT}`);
});
