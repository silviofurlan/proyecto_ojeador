require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

const getDB = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 15,
      host: MYSQL_HOST,
      database: MYSQL_DATABASE,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      timezone: 'Z',
    });
  }

  return await pool.getConnection();
};

module.exports = getDB;
