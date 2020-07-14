const express = require("express");
const cors = require('cors')
const connectToDB = require("./config/db");

const app = express();
connectToDB();
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: true }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo desde el puerto ${PORT}`);
});
