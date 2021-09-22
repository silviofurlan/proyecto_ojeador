const getDB = require('../../bbdd/getDB');

const getUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del usuario.
    const { idUser } = req.params;

    // Obtenemos el id del usuario que hace la request.
    const idReqUser = req.userAuth.id;

    // Obtenemos los datos del usuario.
    const [user] = await connection.query(
      `SELECT id, name, email, avatar, role, club, createdAt FROM users WHERE id = ?`,
      [idUser]
    );

    // Objeto con la info básica del usuario.
    const userInfo = {
      name: user[0].name,
      avatar: user[0].avatar,
    };

    // Si el usuario que solicita los datos es el dueño de dicho usuario agregamos información
    // extra.
    if (user[0].id === idReqUser || req.userAuth.role === 'admin') {
      userInfo.email = user[0].email;
      userInfo.role = user[0].role;
      userInfo.createdAt = user[0].createdAt;
    }

    res.send({
      status: 'ok',
      userInfo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUser;
