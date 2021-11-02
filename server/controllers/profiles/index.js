const addProfilePhoto = require('./addPhoto');
const addSkill = require('./addSkill');
const addVideos = require('./addVideos');
const deletePhoto = require('./deletePhoto');
const deleteProfile = require('./deleteProfile');
const deleteSkills = require('./deleteSkills');
const deleteVideos = require('./deleteVideo');
const editProfile = require('./editProfile');
const getProfile = require('./getProfiles');
const listProfiles = require('./listProfiles');
const newProfile = require('./newProfile');
const sendContract = require('./sendContract');

module.exports = {
  newProfile,
  deleteProfile,
  addProfilePhoto,
  addVideos,
  listProfiles,
  addSkill,
  deleteSkills,
  getProfile,
  deletePhoto,
  editProfile,
  deleteVideos,
  sendContract,
};
