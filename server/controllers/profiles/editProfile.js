const getDB = require('../../bbdd/getDB');
const { formatDate, savePhoto } = require('../../helpers');

const editProfile = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id de la entrada.
    const { idProfile } = req.params;

    // Obtenemos las propiedades del body.
    let { name, position, description, club } = req.body;

    // Si faltan las dos propiedades lanzamos un error.
    if (!name && !position && !description && !club && !req.files) {
      const error = new Error('Faltan campos');
      error.httpStatus = 400;
      throw error;
    }

    // Obtenemos los datos del perfil.
    const [profile] = await connection.query(
      `SELECT name, position,  description, club FROM profiles WHERE id = ?`,
      [idProfile]
    );

    // Fecha de modificación.
    const modifiedAt = formatDate(new Date());
    /**
     * ############
     * ## Avatar ##
     * ############
     *
     * Comprobar si el usuario quiere insertar un nuevo avatar.
     *
     */
    if (req.files && req.files.avatar) {
      // Comprobamos si el usuario ya tiene un avatar previo.
      // De ser así eliminamos el avatar del disco.
      if (profile[0].avatar) await deletePhoto(profile[0].avatar);

      // Guardamos la foto el disco y obtenemos su nombre.
      const avatarName = await savePhoto(req.files.avatar);

      // Guardamos el avatar en la base de datos.
      await connection.query(
        `UPDATE profiles SET avatar = ?, modifiedAt = ? WHERE id = ?`,
        [avatarName, modifiedAt, idProfile]
      );
    }

    // Si existe "name", "position", "club" o "description" nos quedamos con ese valor, pero si algún
    // valor es undefined, nos quedamos con el valor que ya había.
    name = name || profile[0].name;
    position = position || profile[0].position;
    description = description || profile[0].description;
    club = club || profile[0].club;

    // Actualizamos el perfil.
    await connection.query(
      `UPDATE profiles SET name = ?, position = ?, description = ?, club = ?, modifiedAt = ? WHERE id = ?`,
      [name, position, description, club, modifiedAt, idProfile]
    );

    res.send({
      status: 'ok',
      profile: {
        name,
        position,
        description,
        club,
        modifiedAt,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editProfile;
