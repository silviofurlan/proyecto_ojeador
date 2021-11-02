// console.clear();
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
app.use(cors());
const { PORT } = process.env;
/**
 * #################
 * ## Middlewares ##
 * #################
 */
const userExists = require('./middlewares/userExists');
const authUser = require('./middlewares/authUser');
const canAddProfile = require('./middlewares/canAddProfile');
const canEdit = require('./middlewares/canEdit');
const profileExists = require('./middlewares/profileExists');

//CONTROLADORES DE PERFIL DE JUGADORES
const {
  newProfile,
  addProfilePhoto,
  addVideos,
  addSkill,
  deletePhoto,
  listProfiles,
  deleteSkills,
  getProfile,
  deleteProfile,
  editProfile,
  deleteVideos,
  sendContract,
} = require('./controllers/profiles');

//CONTROLADORES DE USUARIOS
const {
  newUser,
  loginUser,
  validateUser,
  getUser,
  editPass,
  resetPass,
  recoverPass,
  deleteUser,
  editUser,
} = require('./controllers/users');

//Logger
app.use(morgan('dev'));
// Deserializamos el body de tipo "raw".
app.use(express.json());

// Deserializamos el body de tipo "form-data".
app.use(fileUpload());

// Mostrar archivos estáticos
app.use('/fotos', express.static('static/uploads'));

/*############################
//ENDPOINTS PERFILES JUGADORES
##############################
*/
//Crea un nuevo perfil
app.post('/new-profile', authUser, canAddProfile, newProfile);

//Lista los perfiles
app.get('/profiles', listProfiles);

//Selecionar un perfil con su info completa
app.get('/profiles/:idProfile', authUser, profileExists, getProfile);

//Editar un perfil
app.put('/profiles/:idProfile', authUser, profileExists, canEdit, editProfile);

//Borrar un perfil de jugador
app.delete(
  '/profiles/:idProfile',
  authUser,
  profileExists,
  canEdit,
  deleteProfile
);

//Adicionar skill
app.post(
  '/profiles/:idProfile/skills',
  authUser,
  profileExists,
  canEdit,
  addSkill
);

//Eliminar una skill
app.delete(
  '/profiles/:idProfile/skills/:idSkill',
  authUser,
  profileExists,
  canEdit,
  deleteSkills
);

//Adicionar fotos al perfil
app.post(
  '/profiles/:idProfile/photos',
  authUser,
  profileExists,
  canEdit,
  addProfilePhoto
);

// Eliminar una foto del perfil.
app.delete(
  '/profiles/:idProfile/photos/:idPhoto',
  authUser,
  profileExists,
  canEdit,
  deletePhoto
);
//Adicionar videos al perfil
app.post(
  '/profiles/:idProfile/videos',
  authUser,
  profileExists,
  canEdit,
  addVideos
);

//Elimina videos del perfil
app.delete(
  '/profiles/:idProfile/videos/:idVideo',
  authUser,
  profileExists,
  canEdit,
  deleteVideos
);

//Envia oferta de contratación de un jugador al usuario
app.post(
  '/profiles/:idProfile/contract',
  authUser,
  profileExists,
  sendContract
);

/*############################
//ENDPOINTS USUARIOS
##############################
*/

//Crear nuevo usuario
app.post('/register', newUser);

// Login de usuario
app.post('/users', loginUser);

// Validar usuario.
app.get('/users/validate/:registrationCode', validateUser);

//Exibir el perfil de un Usuario
app.get('/users/:idUser', authUser, userExists, getUser);

//Edita un usuario
app.put('/user/:idUser', authUser, userExists, editUser);

//Edita la contraseña del usuario
app.put('/users/:idUser/password', authUser, userExists, editPass);

//Enviar codigo de recuperacion de contraseña al usuario
app.put('/users/password/recover', recoverPass);

//Resetea la contraseña del usuario utilizando el codigo enviado
app.put('/users/password/reset', resetPass);

//Elimina una cuenta de usuario
app.delete('/users/:idUser', authUser, userExists, deleteUser);

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
