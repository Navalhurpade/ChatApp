const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Models/User");

router.put("/", async (req, res) => {
  try {
    const { phoneNo: recivedPhoneNo, _id } = req.body;
    const query = { phoneNo: recivedPhoneNo };
    const foundUser = await User.findOne(query).exec();

    if (!foundUser) {
      res.write({ error: "User Does not exist !" });
      res.end();
    }

    const updatedUser = await User.updateOne(query, {
      $push: { freindRequests: _id },
    });

    res.send({ info: "Request sent !" });
    res.end();
  } catch (error) {
    console.log("Error occured while sending request @", error);
  }
});

router.patch("/acepted", async (req, res) => {
  try {
    const { myId, requestedUsersId } = req.body;

    const user = await User.findById(myId);

    // const reqUsrsIdObj = mongoose.Schema.Types.ObjectId(requestedUsersId);
    // console.log(reqUsrsIdObj);
    // const updatedFreindRequests = user.freindRequests.filter(
    //   (id) => id !== reqUsrsIdObj
    // );
    // console.log(updatedFreindRequests);
    const findQuery = { _id: myId };
    const updateQuery = {
      $push: { freinds: requestedUsersId },
      $pull: { freindRequests: requestedUsersId },
    };

    const upuser = await User.updateOne(findQuery, updateQuery);

    if (!user) {
      res.write({ error: "User does not exist !" });
      res.end();
      console.log("User does not exist ");
      return;
    }

    if (upuser.ok === 1 && upuser.nModified === 1) {
      res.send({ info: "Requset acepted sucessfully !" });
      res.end();
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
