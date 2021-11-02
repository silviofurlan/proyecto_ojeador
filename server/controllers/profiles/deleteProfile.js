const getDB = require('../../bbdd/getDB');
const { deletePhotoFile } = require('../../helpers');

const deleteProfile = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del usuario que queremos borrar.
    const { idProfile } = req.params;

    // // Si el usuario que realiza la petición no es el dueño de la cuenta o no es
    // // administrador lanzamos un error.
    // if (req.userAuth.id !== Number(idUser) && req.userAuth.role !== 'admin') {
    //   const error = new Error('No tienes suficientes permisos');
    //   error.httpStatus = 401;
    //   throw error;
    // }

    // Seleccionamos las fotos relacionadas con el perfil.
    const [photos] = await connection.query(
      `SELECT name FROM photos WHERE idProfile = ?`,
      [idProfile]
    );

    // Borramos las fotos del disco.
    for (const photo of photos) {
      await deletePhotoFile(photo.name);
    }

    // Obtenemos el nombre del avatar.
    const [avatar] = await connection.query(
      `SELECT avatar FROM profiles WHERE id = ?`,
      [idProfile]
    );

    // Si el usuario tiene avatar lo borramos del disco.
    if (avatar[0].avatar) {
      await deletePhotoFile(avatar[0].avatar);
    }

    // Borramos las skills.
    await connection.query(`DELETE FROM skills WHERE id = ?`, [idProfile]);

    // Borramos el perfil.
    await connection.query(`DELETE FROM profiles WHERE id = ?`, [idProfile]);

    res.send({
      status: 'ok',
      message: 'El perfil ha sido eliminado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteProfile;
