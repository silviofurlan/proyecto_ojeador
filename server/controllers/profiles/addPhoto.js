const getDB = require('../../bbdd/getDB');
const { savePhoto, formatDate } = require('../../helpers');

const addProfilePhoto = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del perfil.
    const { idProfile } = req.params;

    // Si no recibimos ninguna foto lanzamos un error.
    if (!req.files || !req.files.photo) {
      const error = new Error('No se ha encontrado ningún archivo');
      error.httpStatus = 400;
      throw error;
    }

    // Comprobamos cuántas fotos tiene la entrada.
    const [photos] = await connection.query(
      `SELECT name FROM photos WHERE idProfile = ?`,
      [idProfile]
    );

    // Si hay 3 fotos lanzamos un error.
    if (photos.length >= 3) {
      const error = new Error('Este perfil ya tiene  fotos');
      error.httpStatus = 403;
      throw error;
    }

    // Fecha de creación.
    const createdAt = formatDate(new Date());

    // Variable que almacenará el nombre de la imagen.
    let photoName;

    try {
      // Guardamos la foto en el servidor y obtenemos el nombre de la misma.
      photoName = await savePhoto(req.files.photo);
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

    res.send({
      status: 'ok',
      message: 'La foto ha sido guardada',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addProfilePhoto;
