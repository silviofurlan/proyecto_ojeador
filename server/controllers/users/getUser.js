const getDB = require('../../bbdd/getDB');

const getUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del usuario.
    const { idUser } = req.params;

    // Obtenemos el id del usuario que hace la request.
    const idReqUser = req.userAuth.id;
    let userInfo;
    if (Number(idUser) === idReqUser || req.userAuth.role === 'admin') {
      // Obtenemos los datos del usuario.
      const [user] = await connection.query(
        `SELECT users.id, users.name, users.email, group_concat(profiles.name) as profiles, group_concat(profiles.id) as profileId
       FROM users
       left JOIN profiles ON profiles.idUser = users.id
       WHERE users.id = ?`,
        [idUser]
      );

      const profilesName = new Set([user[0].profiles]);
      const profilesId = new Set([user[0].profileId]);

      // Objeto con la info del usuario.

      userInfo = {
        name: user[0].name,
        email: user[0].email,
        profilesName: Array.from(profilesName),
        profilesId: Array.from(profilesId),
      };
      console.log('USER INFO', userInfo.profilesName);
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
