const User = require("../Models/User");

async function getletestData(id) {
  const userData = await (await User.findById(id)).populated("freinds");

  delete userData.password;
  return userData;
}

module.exports = getletestData;
