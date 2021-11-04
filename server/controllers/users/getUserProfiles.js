const getDB = require('../../bbdd/getDB');

const getUserProfiles = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del perfil.
    const { idUser } = req.params;

    const idReqUser = req.userAuth.id;
    let userProfiles;
    if (Number(idUser) === idReqUser || req.userAuth.role === 'admin') {
      // Obtenemos los datos del usuario.
      [userProfiles] = await connection.query(
        `
                SELECT profiles.*
                FROM profiles
                WHERE profiles.idUser = ?
            `,
        [idUser]
      );
    } else {
      const error = new Error('No tienes suficientes permisos');
      error.httpStatus = 401;
      throw error;
    }

    res.send({
      status: 'ok',
      userProfiles,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUserProfiles;
