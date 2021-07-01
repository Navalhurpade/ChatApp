const User = require("../Models/User");

async function retriveUsersData(
  id,
  populatePath = "freindRequests",
  selectedfeeds = ""
) {
  //retrive letest data from db
  const foundData = await User.findById(id).populate({
    path: `freinds ${populatePath}`,
    populate: {
      path: "freind conversation",
      select: `name phoneNo conversations ${selectedfeeds}`,
    },
  });

  return foundData;
}

module.exports = retriveUsersData;
