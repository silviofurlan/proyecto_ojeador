const getDB = require('../../bbdd/getDB');
const { deletePhotoFile } = require('../../helpers');

const deletePhoto = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtener el id del perfil y el id de la foto.
    const { idProfile, idPhoto } = req.params;

    // Obtenemos la foto.
    const [photo] = await connection.query(
      `SELECT name FROM photos WHERE id = ? AND idProfile = ?`,
      [idPhoto, idProfile]
    );

    // Si la foto no existe lanzamos un error.
    if (photo.length < 1) {
      const error = new Error('La foto no existe');
      error.httpStatus = 404;
      throw error;
    }

    // Borrar la foto del servidor.
    await deletePhotoFile(photo[0].name);

    // Borrar la foto de la base de datos.
    await connection.query(
      `DELETE FROM photos WHERE id = ? AND idProfile = ?`,
      [idPhoto, idProfile]
    );

    res.send({
      status: 'ok',
      message: 'Foto eliminada',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePhoto;
