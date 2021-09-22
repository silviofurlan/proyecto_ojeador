const getDB = require('../../bbdd/getDB');
const { formatDate } = require('../../helpers');

const addSkill = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del perfil.
    const { idProfile } = req.params;

    // Comprobamos cuántas Skills tiene el perfil.
    const [skills] = await connection.query(
      `SELECT skillName FROM skills WHERE idProfile = ?`,
      [idProfile]
    );

    // Si hay 5 lanzamos un error.
    if (skills.length >= 3) {
      const error = new Error('Este perfil ya tiene 3 skills');
      error.httpStatus = 403;
      throw error;
    }
    // Obtenemos los campos necesarios.
    const { skill } = req.body;
    // Fecha de creación.
    const createdAt = formatDate(new Date());

    // Creamos la skill y guardamos el valor que retorna "connection.query".
    await connection.query(
      `
            INSERT INTO skills (skillName, idProfile, createdAt)
            VALUES(?, ?, ?)
        `,
      [skill, idProfile, createdAt]
    );

    res.send({
      status: 'ok',
      message: 'La skill ha sido añadida',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addSkill;
