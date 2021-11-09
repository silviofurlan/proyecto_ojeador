const getDB = require('../../bbdd/getDB');

const searchProfiles = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos los posibles querystrings que puedan llegarnos.
    const { position, club, skill, age, category, order, direction } =
      req.query;

    // Posibles valores para "order".
    const validOrderOptions = ['position', 'skill', 'age', 'club', 'createdAt'];

    // Posibles valores para "direction".
    const validDirectionOptions = ['DESC', 'ASC'];

    // Establecemos que el orden por defecto sea por la columna createdAt en caso
    // de que no venga ningún orden definido.
    const orderBy = validOrderOptions.includes(order) ? order : 'createdAt';

    // Establecemos la dirección por defecto en caso de que no venga una dirección dada.
    const orderDirection = validDirectionOptions.includes(direction)
      ? direction
      : 'DESC';

    // Variable donde almacenaremos los perfiles.
    let results;

    // Obtenemos la información del perfil.

    [results] = await connection.query(
      `
                    SELECT profiles.name, profiles.id, profiles.idUser, profiles.category, profiles.club,profiles.position, profiles.birthDate, profiles.createdAt, group_concat(skills.skillName) as skills, group_concat(skills.id) as skillsID
                    FROM profiles
                    JOIN skills ON skills.idProfile = profiles.id
                    WHERE profiles.position LIKE ? OR profiles.club LIKE ? OR skills.skillName LIKE ?
                    GROUP BY profiles.id
                    ORDER BY ${orderBy} ${orderDirection}
                `,
      [`%${position}%`, `%${club}%`, `%${skill}%`]
    );

    console.log('search', req.query);
    res.send({
      status: 'ok',
      results,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = searchProfiles;
