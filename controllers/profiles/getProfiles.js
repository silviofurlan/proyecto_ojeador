const getDB = require('../../bbdd/getDB');

const getProfile = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id de la entrada.
    const { idProfile } = req.params;

    // Obtenemos la información de la entrada.
    //FALTA HACER QUE EL RESULTADO INCLUYA LOS VIDEOS Y QUE NO SE DUPLIQUE CUANDO HAYA MAS DE 1 SKILL, FOTO O VIDEO.
    const [profile] = await connection.query(
      `
                SELECT profiles.name, profiles.position, profiles.category, profiles.club, skills.skillName, photos.name
                FROM profiles
                LEFT JOIN skills ON (profiles.id = skills.idProfile)
                LEFT JOIN photos ON (profiles.id = photos.idProfile)
                WHERE profiles.id = ?
            `,
      [idProfile]
    );

    res.send({
      status: 'ok',
      profile,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getProfile;
