const getDB = require('../../bbdd/getDB');
const { formatDate, validate, savePhoto } = require('../../helpers');
const newProfileSchema = require('../../schemas/newProfileSchema');

const newProfile = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    // Obtenemos el id del usuario que está creando el perfil.
    const idReqUser = req.userAuth.id;

    // Comprobamos cuántos perfiles tiene la cuenta.
    const [profiles] = await connection.query(
      `SELECT name FROM profiles WHERE idUser = ?`,
      [idReqUser]
    );

    // Si hay 3 fotos lanzamos un error.
    if (profiles.length >= 3) {
      const error = new Error('Solo puedes tener 3 perfiles');
      error.httpStatus = 403;
      throw error;
    }

    // Validamos los datos del body.
    await validate(newProfileSchema, req.body);

    // Obtenemos las propiedades del body.
    const { name, position, birthDate, category, description, club, skill } =
      req.body;
    // Fecha de creación.
    const createdAt = formatDate(new Date());

    // Creamos el perfil y guardamos el valor que retorna "connection.query".
    const [newProfile] = await connection.query(
      `
      INSERT INTO profiles (idUser, name, position, birthDate, category, description, club, createdAt)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        idReqUser,
        name,
        position,
        birthDate,
        category,
        description,
        club,
        createdAt,
      ]
    );

    //OBTENERMOS EL ID DEL PERFIL CREADO
    const newProfileId = newProfile.insertId;

    //INSERTAMOS LA SKILL EN LA TABLA SKILLS
    await connection.query(
      `
        INSERT INTO skills (skillName, idProfile, createdAt)
        VALUES(?, ?, ?)
        `,
      [skill, newProfileId, createdAt]
    );

    //comprobamos si el hay un avatar
    if (req.files.avatar) {
      const avatar = await savePhoto(req.files.avatar);
      await connection.query(
        `UPDATE profiles SET avatar = ?, modifiedAt = ? WHERE id = ? `,
        [avatar, formatDate(new Date()), newProfileId]
      );
    }

    // Comprobamos si "req.files" existe y si tiene contenido. Si es así guardamos .
    if (req.files && Object.keys(req.files).length > 0) {
      // Recorremos los valores de "req.files".
      for (const photo of Object.values(req.files).slice(0, 3)) {
        // Variable que almacenará el nombre de la imagen.
        let photoName;

        try {
          // Guardamos la foto en el servidor y obtenemos el nombre de la misma.
          photoName = await savePhoto(photo);
        } catch (_) {
          const error = new Error('Formato de archivo incorrecto');
          error.httpStatus = 400;
          throw error;
        }

        // Guardamos la foto.
        await connection.query(
          `INSERT INTO photos (name, idProfile, createdAt) VALUES (?, ?, ?)`,
          [photoName, newProfileId, formatDate(new Date())]
        );
      }
    }

    res.send({
      status: 'ok',
      message: 'El perfil ha sido creado con éxito',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newProfile;
