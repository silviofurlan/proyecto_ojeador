const getDB = require('../../bbdd/getDB');
const { formatDate, validate, savePhoto } = require('../../helpers');
const newProfileSchema = require('../../schemas/newProfileSchema');

const newProfile = async (req, res, next) => {
  let connection;

  try {
    // Obtenemos el id del usuario que está creando el perfil.
    const idReqUser = req.userAuth.id;

    connection = await getDB();
    // Validamos los datos del body.
    await validate(newProfileSchema, req.body);

    // Obtenemos las propiedades del body.
    const { name, position, birthYear, category, description, club } = req.body;
    // Fecha de creación.
    const createdAt = formatDate(new Date());

    // Creamos el perfil y guardamos el valor que retorna "connection.query".
    const [newProfile] = await connection.query(
      `
             INSERT INTO profiles (idUser, name, position, birthYear, category, description, club, createdAt)
             VALUES(?, ?, ?, ?, ?, ?, ?, ?)
         `,
      [
        idReqUser,
        name,
        position,
        birthYear,
        category,
        description,
        club,
        createdAt,
      ]
    );
    // Obtenemos el id del perfil creado.
    const idProfile = newProfile.insertId;
    // Comprobamos si "req.files" existe y si tiene contenido. Si es así guardamos la foto.
    if (req.files && Object.keys(req.files).length > 0) {
      // Recorremos los valores de "req.files".
      for (const photo of Object.values(req.files).slice(0, 3)) {
        // Variable que almacenará el nombre de la imagen.
        let photoName;

        try {
          // Guardamos la foto en el servidor y obtenemos el nombre de la misma.
          photoName = await savePhoto(photo);
        } catch (_) {
          const error = new Error('Formato de archivo incorrecto');
          error.httpStatus = 400;
          throw error;
        }

        // Guardamos la foto.
        await connection.query(
          `INSERT INTO photos (name, idProfile, createdAt) VALUES (?, ?, ?)`,
          [photoName, idProfile, createdAt]
        );
      }
    }

    res.send({
      status: 'ok',
      message: 'El perfil ha sido creado con éxito',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newProfile;
