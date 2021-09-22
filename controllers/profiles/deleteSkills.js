const getDB = require('../../bbdd/getDB');

const deleteSkills = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtener el id del perfil y el id de la skill.
    const { idProfile, idSkill } = req.params;

    // Obtenemos la skill.
    const [skill] = await connection.query(
      `SELECT skillName FROM skills WHERE id = ? AND idProfile = ?`,
      [idSkill, idProfile]
    );

    // Si la skill no existe lanzamos un error.
    if (skill.length < 1) {
      const error = new Error('La skill no existe');
      error.httpStatus = 404;
      throw error;
    }

    // Borrar la skill de la base de datos.
    await connection.query(
      `DELETE FROM skills WHERE id = ? AND idProfile = ?`,
      [idSkill, idProfile]
    );

    res.send({
      status: 'ok',
      message: 'Skill eliminada',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteSkills;
