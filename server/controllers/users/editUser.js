//coneccion con la bd
const getDB = require('../../bbdd/getDB');

const {
  deletePhoto,
  savePhoto,
  formatDate,
  generateRandomString,
  verifyEmail,
} = require('../../helpers');

//Funcion controladora editUser
const editUser = async (req, res, next) => {
  //Solicitar una conecccion
  let connection;

  try {
    connection = await getDB();

    /**
     * #########################
     * ## Obtención idPerfil  ##
     * #########################
     */
    // Obtenemos el id del usuario que queremos modificar.
    const { idUser } = req.params;

    /**
     * ###########
     * ## Body ##
     * ##########
     */
    //Obtenemos las propiedade del body y requirimos
    //Usamos let para usar un destructure
    let { email, name } = req.body;

    const idReqUser = req.userAuth.id;

    // /**
    //  * ####################################
    //  * ## Con permiso para editar: admin ##
    //  * ####################################
    //  */
    // // Lanzamos un error en caso de que no seamos dueños de este usuario.
    if (Number(idUser) !== Number(idReqUser)) {
      const error = new Error('No tienes permisos para editar este usuario');
      error.httpStatus = 403;
      throw error;
    }

    /**
     * ##########################
     * ## Si faltan los datos ##
     * ##########################
     */

    //Si no llega ningun dato lanzamos un error
    if (!name && !email && !(req.files && req.files.avatar)) {
      const error = new Error('Faltan campos');
      //creamos el error httpStatus manualmente
      error.httpStatus = 400;
      //Lanzamos el error y luego se va al catch
      throw error;
    }

    // Obtenemos el email, el nombre y el avatar del usuario actual.
    const [user] = await connection.query(
      `SELECT  email, name FROM users WHERE id = ?`,
      [idUser]
    );

    //  ################################################
    // Obtenemos la fecha de modificación.
    const modifiedAt = formatDate(new Date());

    // /**
    //  * ###########
    //  * ## Email ##
    //  * ###########
    //  *
    //  * En caso de que haya email debemos comprobar si es distinto al existente.
    //  *
    //  */
    if (email && email !== user[0].email) {
      // Comprobamos que el nuevo email no exista en la base de datos.
      const [existingEmail] = await connection.query(
        `SELECT id FROM users WHERE email = ?`,
        [email]
      );

      // Si el email ya existe lanzamos un error.
      if (existingEmail.length > 0) {
        const error = new Error(
          'Ya existe un usuario con ese email en la base de datos'
        );
        error.httpStatus = 409;
        throw error;
      }

      // Actualizamos el usuario en la base de datos junto al código de registro.
      await connection.query(
        `UPDATE users SET email = ?,  active = false, createdAt = ? WHERE id = ?`,
        [email, modifiedAt, idUser]
      );

      // Creamos un código de registro de un solo uso.
      const registrationCode = generateRandomString(40);

      // Enviamos un mensaje de verificación al nuevo email del usuario.
      await verifyEmail(email, registrationCode);
      // Actualizamos el usuario en la base de datos junto al código de registro.
      await connection.query(
        `UPDATE users SET email = ?, registrationCode = ?, active = false, createdAt = ? WHERE id = ?`,

        [email, registrationCode, modifiedAt, idUser]
      );
    }

    /**
     * ##########
     * ## Name ##
     * ##########
     *
     * En caso de que haya nombre comprobamos si es distinto al existente.
     *
     */

    if (name && user[0].name !== name) {
      await connection.query(
        `UPDATE users SET name = ?, modifiedAt = ? WHERE id = ?`,
        [name, modifiedAt, idUser]
      );
    }

    res.send({
      status: 'ok',
      message: 'Datos de usuario actualizados',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
