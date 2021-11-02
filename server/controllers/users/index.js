const deleteUser = require('./deletUser');
const editPass = require('./editPassword');
const getUser = require('./getUser');
const loginUser = require('./loginUser');
const newUser = require('./newUser');
const recoverPass = require('./recoverPassword');
const resetPass = require('./resetPassword');
const validateUser = require('./validateUser');
const editUser = require('./editUser');

module.exports = {
  loginUser,
  newUser,
  validateUser,
  getUser,
  editPass,
  recoverPass,
  resetPass,
  deleteUser,
  editUser,
};
