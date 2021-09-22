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
    const { name, position, birthYear, category, description, club, skill } =
      req.body;
    // Fecha de creación.
    const createdAt = formatDate(new Date());
    console.log(skill);

    // Creamos el perfil y guardamos el valor que retorna "connection.query".
    await connection.query(
      `
             INSERT INTO profiles (idUser, name, position, birthYear, category, description, club, createdAt)
             VALUES(?, ?, ?, ?, ?, ?, ?, ?)
         `,
      [
        idReqUser,
        name,
        position,
        birthYear,
        category,
        description,
        club,
        createdAt,
      ]
    );

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
