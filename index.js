const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");


// Crear el servidor de express
const app = express();

// Dotenv
require('dotenv').config()

// DB
dbConnection()

// CORS
app.use(cors())

// Directorio Publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use( express.json() )

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// TODO: CRUD: Eventos

// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
