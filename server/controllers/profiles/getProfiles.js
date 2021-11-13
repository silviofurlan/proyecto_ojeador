const getDB = require('../../bbdd/getDB');

const getProfile = async (req, res, next) => {
  let connection;
  let profileInfo;
  try {
    connection = await getDB();

    // Obtenemos el id del perfil.
    const { idProfile } = req.params;

    // Obtenemos la información del perfil.
    //FALTA HACER QUE EL RESULTADO INCLUYA LOS VIDEOS Y QUE NO SE DUPLIQUE CUANDO HAYA MAS DE 1 SKILL, FOTO O VIDEO.
    const [profile] = await connection.query(
      `
                SELECT profiles.*, group_concat(DISTINCT skills.skillName) as skills, group_concat(DISTINCT skills.id) as skillsId, group_concat(DISTINCT photos.name) as photos, group_concat(DISTINCT photos.id) as photosId, group_concat(DISTINCT videos.name) as videos, group_concat(DISTINCT videos.id) as videosId, group_concat(DISTINCT videos.url) as videosUrl
                FROM profiles
                LEFT JOIN skills ON skills.idProfile = profiles.id
                LEFT JOIN photos ON photos.idProfile = profiles.id
                LEFT JOIN videos ON videos.idProfile = profiles.id
                WHERE profiles.id = ?
            `,
      [idProfile]
    );

    const photos = new Set([profile[0].photos]);
    const photosId = new Set([profile[0].photosId]);
    const skills = new Set([profile[0].skills]);
    const skillsId = new Set([profile[0].skillsId]);
    const videos = new Set([profile[0].videos]);
    const videosUrl = new Set([profile[0].videosUrl]);
    const videosId = new Set([profile[0].videosId]);

    // Objeto con la info del usuario.

    profileInfo = {
      name: profile[0].name,
      id: profile[0].id,
      position: profile[0].position,
      birthDate: profile[0].birthDate,
      category: profile[0].category,
      club: profile[0].club,
      photos: Array.from(photos),
      photosId: Array.from(photosId),
      videos: Array.from(videos),
      videosId: Array.from(videosId),
      videosUrl: Array.from(videosUrl),
      skills: Array.from(skills),
      skillsId: Array.from(skillsId),
    };

    console.log('PROFILE', profileInfo);
    res.send({
      status: 'ok',
      profile,
      profileInfo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getProfile;
