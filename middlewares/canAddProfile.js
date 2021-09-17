const getDB = require('../bbdd/getDB');

const canAddProfile = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Si el usuario que hace la request no es el admin o no tiene cuenta familia
    if (req.userAuth.role !== 'admin' && req.userAuth.role !== 'family') {
      const error = new Error(
        'Este tipo de cuenta no es compatible con esta solicitud.'
      );
      error.httpStatus = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = canAddProfile;
