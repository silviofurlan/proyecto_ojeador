const getDB = require('../bbdd/getDB');

const canEdit = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del perfil.
    const { idProfile } = req.params;

    // Obtenemos el id de usuario dueño del perfil.
    const [owner] = await connection.query(
      `SELECT idUser FROM profiles WHERE id = ?`,
      [idProfile]
    );

    // Si el usuario que hace la request no es el propietario o no
    // es el administrador lanzamos un error.
    if (owner[0].idUser !== req.userAuth.id && req.userAuth.role !== 'admin') {
      const error = new Error('No tienes suficientes permisos');
      console.log(req.userAuth.role);
      error.httpStatus = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = canEdit;
