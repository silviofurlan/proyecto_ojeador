const getDB = require('../../bbdd/getDB');
const { formatDate } = require('../../helpers');

const resetPass = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el código de recuperación y la nueva contraseña.
    const { recoverCode, newPassword } = req.body;

    // Si falta algún campo lanzamos un error.
    if (!recoverCode || !newPassword) {
      const error = new Error('Faltan campos');
      error.httpStatus = 400;
      throw error;
    }

    // Obtenemos al usuario que tenga ese código de recuperación.
    const [user] = await connection.query(
      `SELECT id FROM users WHERE recoverCode = ?`,
      [recoverCode]
    );

    // Si no existe ningún usuario con ese código de recuperación lanzamos un error.
    if (user.length < 1) {
      const error = new Error('Código de recuperación incorrecto');
      error.httpStatus = 404;
      throw error;
    }

    // Actualizamos la contraseña del usuario que tenga ese código de recuperación.
    await connection.query(
      `UPDATE users SET password = SHA2(?, 512), recoverCode = NULL, modifiedAt = ? WHERE id = ?`,
      [newPassword, formatDate(new Date()), user[0].id]
    );

    res.send({
      status: 'ok',
      message: 'Contraseña actualizada',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = resetPass;
