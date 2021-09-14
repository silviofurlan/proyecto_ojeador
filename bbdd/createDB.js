const getDB = require('./getDB');
// const faker = require('faker/locale/es');

// const { formatDate, getRandomValue } = require('../helpers');

async function main() {
  let connection;
  try {
    connection = await getDB();
    //Eliminamos las tablas existentes
    await connection.query('DROP TABLE IF EXISTS scouts;');
    await connection.query('DROP TABLE IF EXISTS families;');
    await connection.query('DROP TABLE IF EXISTS profiles;');
    await connection.query('DROP TABLE IF EXISTS skills;');
    await connection.query('DROP TABLE IF EXISTS videos;');
    await connection.query('DROP TABLE IF EXISTS agreements;');

    //Crea tabla ojeadores
    await connection.query(`
      CREATE TABLE scouts(
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(512) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        club VARCHAR(50) NOT NULL,
        name VARCHAR(100),
        description VARCHAR(400),
        avatar VARCHAR(50),
        active BOOLEAN DEFAULT false,
        deleted BOOLEAN DEFAULT false,
        role ENUM("scout", "family") DEFAULT "normal" NOT NULL,
        registrationCode VARCHAR(100),
        recoverCode VARCHAR(100),
        createdAt DATETIME NOT NULL,
        modifiedAt DATETIME
      )
    `);

    // // Crear la tabla Familias
    await connection.query(`
        CREATE TABLE families (
          id INT PRIMARY KEY AUTO_INCREMENT,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(512) NOT NULL,
          phone VARCHAR(15) NOT NULL,
          name VARCHAR(100),
          avatar VARCHAR(50),
          active BOOLEAN DEFAULT false,
          deleted BOOLEAN DEFAULT false,
          role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
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
        idFamily INT NOT NULL,
        FOREIGN KEY (idFamily) REFERENCES families (id),
        actualClub VARCHAR (50) NOT NULL,
        position VARCHAR (20) NOT NULL,
        description VARCHAR (400),
        birth DATE NOT NULL,
        photo VARCHAR (50) NOT NULL,
        gender ENUM ("MASC", "FEM", "OTRO") DEFAULT "OTRO" NOT NULL, 
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
    // Crear la tabla de perfiles de videos
    await connection.query(`
        CREATE TABLE videos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        createdAt DATETIME NOT NULL,
        idProfile INT NOT NULL,
        FOREIGN KEY (idProfile) REFERENCES profiles (id)
        )        
        `);
    // Crear la tabla de perfiles de contratos
    await connection.query(`
          CREATE TABLE agreements (
          id INT PRIMARY KEY AUTO_INCREMENT,
          idScout INT NOT NULL,
          FOREIGN KEY (idScout) REFERENCES scouts (id),
          idFamily INT NOT NULL,
          FOREIGN KEY (idFamily) REFERENCES families (id),
          idProfile INT NOT NULL,
          FOREIGN KEY (idProfile) REFERENCES profiles (id),
          createdAt DATETIME NOT NULL
          )        
          `);
  } catch (error) {
    console.error(error.message);
    process.exit(0);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
}
main();
