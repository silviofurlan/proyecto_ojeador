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

    // profiles.position LIKE ? AND profiles.club LIKE ? AND skills.skillName LIKE ?

    // Obtenemos la información del perfil.

    let where = '';
    const params = [];

    if (position || club || skill || age || category) {
      const conditions = [];

      if (position) {
        conditions.push('profiles.position LIKE ?');
        params.push(`%${position}%`);
      }

      if (club) {
        conditions.push('profiles.club LIKE ?');
        params.push(`%${club}%`);
      }

      if (skill) {
        conditions.push('skills.skillName LIKE ?');
        params.push(`%${skill}%`);
      }

      if (age) {
        conditions.push('EXTRACT(year from profiles.birthDate) LIKE ?');
        params.push(`${age}`);
      }

      if (category) {
        conditions.push('profiles.category = ?');
        params.push(`${category}`);
      }

      where = `WHERE ${conditions.join(' AND ')}`;
    }

    [results] = await connection.query(
      `
                    SELECT profiles.name, profiles.id, profiles.idUser, profiles.category, profiles.avatar, profiles.club,profiles.position, profiles.birthDate, profiles.createdAt, group_concat(skills.skillName) as skills, group_concat(skills.id) as skillsID
                    FROM profiles
                    JOIN skills ON skills.idProfile = profiles.id
                    ${where}
                    GROUP BY profiles.id
                    ORDER BY ${orderBy} ${orderDirection}
                `,
      params
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
