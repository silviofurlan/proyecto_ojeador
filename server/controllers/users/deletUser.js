const getDB = require('../../bbdd/getDB');
const {
  deletePhotoFile,
  generateRandomString,
  formatDate,
} = require('../../helpers');

const deleteUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del usuario que queremos borrar.
    const { idUser } = req.params;

    // Comprobamos que el id no se corresponda al id del administrador.
    if (Number(idUser) === 1) {
      const error = new Error(
        'El administrador principal no puede ser eliminado'
      );
      error.httpStatus = 403;
      throw error;
    }

    // Si el usuario que realiza la petición no es el dueño de la cuenta o no es
    // administrador lanzamos un error.
    if (req.userAuth.id !== Number(idUser) && req.userAuth.role !== 'admin') {
      const error = new Error('No tienes suficientes permisos');
      error.httpStatus = 401;
      throw error;
    }

    //Comprobamos si el usuario tiene perfiles creados
    const [profiles] = await connection.query(
      `SELECT id FROM profiles WHERE idUser = ?`,
      [idUser]
    );

    //Si el usuario tienes perfile, comprobamos is los perfiles tienen fotos añadidas
    if (profiles) {
      for (const profile of profiles) {
        const [photos] = await connection.query(
          `SELECT name FROM photos WHERE idProfile = ?`,
          [profile.id]
        );

        //Si el perfil tiene fotos, las eliminamos del servidor
        for (const photo of photos) {
          await deletePhotoFile(photo.name);
        }

        // //Eliminamos los registros de la tabla fotos
        // await connection.query(`DELETE FROM photos WHERE idProfile = ?`, [
        //   profile.id,
        // ]);
        // Borramos los perfiles.
        await connection.query(`DELETE FROM profiles WHERE id = ?`, [
          profile.id,
        ]);
      }
    }

    // Anonimizamos al usuario.
    await connection.query(
      `
                UPDATE users
                SET password = ?, name = "[deleted]", email="[deleted]", avatar = NULL, active = 0, deleted = 1, modifiedAt = ?
                WHERE id = ?
            `,
      [generateRandomString(40), formatDate(new Date()), idUser]
    );

    res.send({
      status: 'ok',
      message: 'Usuario eliminado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUser;
