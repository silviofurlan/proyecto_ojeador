const getDB = require('../../bbdd/getDB');
const { savePhoto } = require('../../helpers');

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
      `SELECT photo FROM profiles WHERE idProfile = ?`,
      [idProfile]
    );

    // Si hay, foto lanzamos un error.
    if (photos.length >= 1) {
      const error = new Error('Este perfil ya tiene 1 foto');
      error.httpStatus = 403;
      throw error;
    }

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
    await connection.query(`INSERT INTO profiles (photo) VALUES (?)`, [
      photoName,
    ]);

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