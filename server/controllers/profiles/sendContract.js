const getDB = require('../../bbdd/getDB');
const { sendContractEmail, generateRandomString } = require('../../helpers');

const sendContract = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //Obtenemos el id del usuario que envia la solicitud
    const idReqUser = req.userAuth.id;

    //Comprobamos que el usuario es un ojeador. Si no es un ojeador o administrador, lanzamos un error
    if (req.userAuth.role !== 'scout' && req.userAuth.role !== 'admin') {
      const error = new Error('No tienes suficientes permisos');
      console.log(req.userAuth.role);
      error.httpStatus = 401;
      throw error;
    }
    // Obtenemos el id del perfil.
    const { idProfile } = req.params;

    //Obtenemos el nombre del jugador y el id de la cuenta dueña del perfil
    const [data] = await connection.query(
      `SELECT name, idUser FROM profiles WHERE id = ?`,
      [idProfile]
    );

    //Obtenemos el email de usuario
    const [email] = await connection.query(
      `SELECT email FROM users  WHERE id = ?`,
      [data[0].idUser]
    );

    // Creamos un código de aceptacion de la oferta de contratacion de un solo uso.
    const aceptationCode = generateRandomString(40);

    // Enviamos un mensaje al email del usuario.
    await sendContractEmail(email, data[0].name, aceptationCode);

    res.send({
      status: 'ok',
      message: 'La oferta a sido enviada al responsable del Jugador.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = sendContract;
