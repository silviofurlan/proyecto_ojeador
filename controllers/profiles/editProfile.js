const getDB = require('../../bbdd/getDB');
const { formatDate } = require('../../helpers');

const editProfile = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id de la entrada.
    const { idProfile } = req.params;

    // Obtenemos las propiedades del body.
    let { name, position, description, category, club } = req.body;

    // Si faltan las dos propiedades lanzamos un error.
    if (!name && !position && !description && !category && !club) {
      const error = new Error('Faltan campos');
      error.httpStatus = 400;
      throw error;
    }

    // Obtenemos el perfil.
    const [profile] = await connection.query(
      `SELECT name, position, category, description, club FROM profiles WHERE id = ?`,
      [idProfile]
    );

    // Si existe "name", "position", "category", "club" o "description" nos quedamos con ese valor, pero si algún
    // valor es undefined, nos quedamos con el valor que ya había.
    name = name || profile[0].name;
    position = position || profile[0].position;
    description = description || profile[0].description;
    category = category || profile[0].category;
    club = club || profile[0].club;

    // Fecha de modificación.
    const modifiedAt = formatDate(new Date());

    // Actualizamos el perfil.
    await connection.query(
      `UPDATE profiles SET name = ?, position = ?, category = ?, description = ?, club = ?, modifiedAt = ? WHERE id = ?`,
      [name, position, category, description, club, modifiedAt, idProfile]
    );

    res.send({
      status: 'ok',
      profile: {
        name,
        position,
        category,
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
