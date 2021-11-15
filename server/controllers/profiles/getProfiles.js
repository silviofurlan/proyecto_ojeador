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

    const photosProfile = profile[0].photos ? profile[0].photos.split(',') : [];
    const photosId = profile[0].photosId ? profile[0].photosId.split(',') : [];
    const skills = profile[0].skills ? profile[0].skills.split(',') : [];
    const skillsId = profile[0].skillsId ? profile[0].skillsId.split(',') : [];
    const videos = profile[0].videos ? profile[0].videos.split(',') : [];
    const videosUrl = profile[0].videosUrl
      ? profile[0].videosUrl.split(',')
      : [];
    const videosId = profile[0].videosId ? profile[0].videosId.split(',') : [];

    // Objeto con la info del usuario.

    profileInfo = {
      avatar: profile[0].avatar,
      name: profile[0].name,
      id: profile[0].id,
      position: profile[0].position,
      birthDate: profile[0].birthDate,
      category: profile[0].category,
      club: profile[0].club,
      idUser: profile[0].idUser,
      photos: photosProfile,
      photosId: photosId,
      videos: videos,
      videosId: videosId,
      videosUrl: videosUrl,
      skills: skills,
      skillsId: skillsId,
    };
    res.send({
      status: 'ok',
      profile,
      profileInfo,
    });

    console.log('PROFILE', profileInfo);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getProfile;
