// console.clear();
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const app = express();

const { PORT } = process.env;
/**
 * #################
 * ## Middlewares ##
 * #################
 */
const userExists = require('./middlewares/userExists');

//CONTROLADORES DE PERFIL DE JUGADORES
const { newProfile, addProfilePhoto } = require('./controllers/profiles');

//Logger
app.use(morgan('dev'));
// Deserializamos el body de tipo "raw".
app.use(express.json());

// Deserializamos el body de tipo "form-data".
app.use(fileUpload());

//ENDPOINTS PERFILES JUGADORES

//Crea un nuevo perfil
app.post('/profiles/:idUser', userExists, newProfile);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
