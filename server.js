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
const authUser = require('./middlewares/authUser');
const canAddProfile = require('./middlewares/canAddProfile');

//CONTROLADORES DE PERFIL DE JUGADORES
const {
  newProfile,
  addProfilePhoto,
  listProfiles,
  addSkill,
} = require('./controllers/profiles');

//CONTROLADORES DE USUARIOS
const { newUser, loginUser, validateUser } = require('./controllers/users');

//Logger
app.use(morgan('dev'));
// Deserializamos el body de tipo "raw".
app.use(express.json());

// Deserializamos el body de tipo "form-data".
app.use(fileUpload());

/*############################
//ENDPOINTS PERFILES JUGADORES
##############################
*/
//Crea un nuevo perfil
app.post('/profiles/:idUser', authUser, userExists, canAddProfile, newProfile);

//Lista los perfiles
app.get('/profiles', listProfiles);

//Adicionar skill
app.post('/skills/:idProfile', addSkill);

/*############################
//ENDPOINTS USUARIOS
##############################
*/

app.post('/users', newUser);
// Login de usuario
app.post('/users/login', loginUser);

// Validar usuario.
app.get('/users/validate/:registrationCode', validateUser);

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
