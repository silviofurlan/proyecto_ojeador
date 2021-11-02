const getDB = require('../../bbdd/getDB');

const getProfile = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del perfil.
    const { idProfile } = req.params;

    // Obtenemos la información del perfil.
    //FALTA HACER QUE EL RESULTADO INCLUYA LOS VIDEOS Y QUE NO SE DUPLIQUE CUANDO HAYA MAS DE 1 SKILL, FOTO O VIDEO.
    const [profile] = await connection.query(
      `
                SELECT profiles.*, group_concat(skills.skillName) as skills, group_concat(skills.id) as skillsID, group_concat(photos.name) as photos, group_concat(photos.id) as photosID
                FROM profiles
                JOIN skills ON skills.idProfile = profiles.id
                JOIN photos ON photos.idProfile = profiles.id
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
