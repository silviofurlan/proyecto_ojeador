const getDB = require('./getDB');
const { formatDate } = require('../helpers');
const faker = require('faker/locale/es');

// const { formatDate, getRandomValue } = require('../helpers');

async function main() {
  let connection;
  try {
    connection = await getDB();
    //Eliminamos las tablas existentes
    await connection.query('DROP TABLE IF EXISTS photos;');
    await connection.query('DROP TABLE IF EXISTS skills;');
    await connection.query('DROP TABLE IF EXISTS videos;');
    await connection.query('DROP TABLE IF EXISTS profiles;');
    await connection.query('DROP TABLE IF EXISTS users;');

    //Crea tabla usuarios
    await connection.query(`
      CREATE TABLE users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(512) NOT NULL,
        name VARCHAR(100),
        club VARCHAR (100),
        avatar VARCHAR (50),
        active BOOLEAN DEFAULT false,
        deleted BOOLEAN DEFAULT false,
        role ENUM("admin", "family", "scout") NOT NULL,
        registrationCode VARCHAR(100),
        recoverCode VARCHAR(100),
        createdAt DATETIME NOT NULL,
        modifiedAt DATETIME
        )
        `);

    // Crear la tabla de perfiles de jugadores (confirmar atributo gender)
    await connection.query(`
    CREATE TABLE profiles (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(50) NOT NULL,
      idUser INT NOT NULL,
      FOREIGN KEY (idUser) REFERENCES users (id),
      club VARCHAR (50),
      position VARCHAR (20) NOT NULL,
      description VARCHAR (400) NOT NULL,
      birthYear INT (255) NOT NULL,
      category ENUM ("M", "F") NOT NULL, 
      avatar VARCHAR (50),
      createdAt DATETIME NOT NULL,
      modifiedAt DATETIME 
      )        
      `);
    // Crear la tabla de perfiles de skills ()
    await connection.query(`
      CREATE TABLE skills (
        id INT PRIMARY KEY AUTO_INCREMENT,
        skillName VARCHAR(50) NOT NULL,
        skillValues VARCHAR (20),
        idProfile INT NOT NULL,
        FOREIGN KEY (idProfile) REFERENCES profiles (id)
        )        
        `);
    // Crear la tabla de perfiles de videos (utilizaremos enlaces de youtube)
    await connection.query(`
        CREATE TABLE videos (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50) NOT NULL,
          url VARCHAR (500) NOT NULL, 
          createdAt DATETIME NOT NULL,
          idProfile INT NOT NULL,
          FOREIGN KEY (idProfile) REFERENCES profiles (id)
          )        
          `);

    // Crear la tabla de fotos
    await connection.query(`
        CREATE TABLE photos (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50) NOT NULL, 
          idProfile INT NOT NULL,
          FOREIGN KEY (idProfile) REFERENCES profiles (id),
          createdAt DATETIME NOT NULL
          )        
          `);

    //Crear usuarios fakes de prueba role familia
    const FAMILY_USERS = 10;
    for (let i = 0; i < FAMILY_USERS; i++) {
      //Datos de faker
      const name = faker.name.findName();
      const password = faker.internet.password();
      const email = faker.internet.email();

      //fecha de creacion
      const createdAt = formatDate(new Date());

      await connection.query(`
      INSERT INTO users (email, password, name, active, createdAt, role)
      VALUES ("${email}", "${password}", "${name}", true, "${createdAt}", "family")
    `);
    }
    //Crear usuarios fakes de prueba role ojeador
    const SCOUT_USERS = 5;
    for (let i = 0; i < SCOUT_USERS; i++) {
      //Datos de faker
      const name = faker.name.findName();
      const password = faker.internet.password();
      const email = faker.internet.email();

      //fecha de creacion
      const createdAt = formatDate(new Date());

      await connection.query(`
      INSERT INTO users (email, password, name, active, createdAt, role)
      VALUES ("${email}", "${password}", "${name}", true, "${createdAt}", "scout")
    `);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(0);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
}
main();

// // Crear la tabla Familias
// await connection.query(`
//     CREATE TABLE families (
//       id INT PRIMARY KEY AUTO_INCREMENT,
//       email VARCHAR(100) UNIQUE NOT NULL,
//       password VARCHAR(512) NOT NULL,
//       phone VARCHAR(15) NOT NULL,
//       name VARCHAR(100),
//       avatar VARCHAR(50),
//       active BOOLEAN DEFAULT false,
//       deleted BOOLEAN DEFAULT false,
//       role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
//       registrationCode VARCHAR(100),
//       recoverCode VARCHAR(100),
//       createdAt DATETIME NOT NULL,
//       modifiedAt DATETIME
//       )
//     `);

// Crear la tabla de perfiles de contratos
// await connection.query(`
//       CREATE TABLE agreements (
//       id INT PRIMARY KEY AUTO_INCREMENT,
//       idScout INT NOT NULL,
//       FOREIGN KEY (idScout) REFERENCES scouts (id),
//       idFamily INT NOT NULL,
//       FOREIGN KEY (idFamily) REFERENCES families (id),
//       idProfile INT NOT NULL,
//       FOREIGN KEY (idProfile) REFERENCES profiles (id),
//       createdAt DATETIME NOT NULL
//       )
//       `);