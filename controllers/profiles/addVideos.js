const getDB = require('../../bbdd/getDB');
const { formatDate } = require('../../helpers');

const addVideos = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del perfil.
    const { idProfile } = req.params;

    // Comprobamos cuántos videos tiene el perfil.
    const [video] = await connection.query(
      `SELECT name FROM videos WHERE idProfile = ?`,
      [idProfile]
    );

    // Si hay 5 lanzamos un error.
    if (video.length >= 3) {
      const error = new Error('Este perfil ya tiene 3 videos');
      error.httpStatus = 403;
      throw error;
    }
    // Obtenemos los campos necesarios.
    const { name, url } = req.body;
    // Fecha de creación.
    const createdAt = formatDate(new Date());

    // Creamos la skill y guardamos el valor que retorna "connection.query".
    await connection.query(
      `
            INSERT INTO videos (name, url, idProfile, createdAt)
            VALUES(?, ?, ?, ?)
        `,
      [name, url, idProfile, createdAt]
    );

    res.send({
      status: 'ok',
      message: 'El vídeo ha sido añadido',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addVideos;
