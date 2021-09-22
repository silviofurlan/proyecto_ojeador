const getDB = require('../../bbdd/getDB');

const deleteVideos = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtener el id del perfil y el id del video.
    const { idProfile, idVideo } = req.params;

    // Obtenemos el video.
    const [video] = await connection.query(
      `SELECT name FROM videos WHERE id = ? AND idProfile = ?`,
      [idVideo, idProfile]
    );

    // Si el video no existe lanzamos un error.
    if (video.length < 1) {
      const error = new Error('El video no existe');
      error.httpStatus = 404;
      throw error;
    }

    // Borrar el video de la base de datos.
    await connection.query(
      `DELETE FROM videos WHERE id = ? AND idProfile = ?`,
      [idVideo, idProfile]
    );

    res.send({
      status: 'ok',
      message: 'Video eliminado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteVideos;
