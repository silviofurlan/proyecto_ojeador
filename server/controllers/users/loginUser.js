const getDB = require('../../bbdd/getDB');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el email y la password.
    const { email, password } = req.body;

    // Si falta algún dato lanzamos un error.
    if (!email || !password) {
      const error = new Error('Faltan campos');
      error.httpStatus = 400;
      throw error;
    }

    // Comprobamos si existe un usuario con ese email y esa contraseña.
    const [user] = await connection.query(
      `SELECT id, role, name, active FROM users WHERE email = ? AND password = SHA2(?, 512)`,
      [email, password]
    );

    // Si el usuario no existe lanzamos un error.
    if (user.length < 1) {
      const error = new Error('Email o contraseña incorrectos');
      error.httpStatus = 401;
      throw error;
    }

    // Si el usuario existe pero no está activo lanzamos un error.
    if (!user[0].active) {
      const error = new Error('Usuario pendiente de validar');
      error.httpStatus = 401;
      throw error;
    }

    // Objeto con la información que le queramos pasar al token.
    const tokenInfo = {
      id: user[0].id,
      role: user[0].role,
    };

    // Creamos el token.
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '30d',
    });

    res.send({
      status: 'ok',
      token,
      user,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loginUser;
