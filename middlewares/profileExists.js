const getDB = require('../bbdd/getDB');

const profileExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del perfil.
    const { idProfile } = req.params;

    // Obtenemos el perfil.
    const [profile] = await connection.query(
      `SELECT id FROM profiles WHERE id = ? AND deleted = false`,
      [idProfile]
    );

    // Si el perfil no existe lanzamos un error.
    if (profile.length < 1) {
      const error = new Error('El perfil no existe');
      error.httpStatus = 404;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = profileExists;
