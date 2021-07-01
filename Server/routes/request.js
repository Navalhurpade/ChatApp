const express = require("express");
const mongoose = require("mongoose");
const Conversation = require("../Models/Conversation");
const router = express.Router();
const User = require("../Models/User");

//route to send freind requests
router.put("/", async (req, res) => {
  try {
    const { phoneNo: recivedPhoneNo, myId } = req.body;

    //find the User in DB by his id
    const query = { phoneNo: recivedPhoneNo };

    //Finding User by query
    const foundUser = await User.findOne(query).exec();

    //If Cant find user return bad request with error !
    if (!foundUser) {
      res.send({ error: "User Does not exist !" });
      res.end();
    }

    //Updataing user e.i => adding myId to his freindRequest list
    const updatedUser = await User.updateOne(query, {
      $push: { freindRequests: myId },
    });

    //if all goes well return success message !
    if (updatedUser.ok === 1 && updatedUser.nModified === 1) {
      res.send({ info: "Request sent !" });
      res.end();
    }
  } catch (error) {
    console.log("Error occured while sending request @", error);
  }
});

//route to accept incoming freind request !
router.patch("/acepted", async (req, res) => {
  try {
    const { myId, requestedUsersId, isAcepted } = req.body;

    //req is not Acepted e.i Deleted
    if (!isAcepted) {
      //remove the req from
      await User.updateOne(
        { _id: myId },
        { $pull: { freindRequests: requestedUsersId } }
      );
      res.send({ info: "Request Deleted !" });
      res.end();
    }
    //frist find the request reciver user in db
    const user = await User.findById(myId);

    //if not found return with error
    if (!user) {
      res.send({ error: "User does not exist !" });
      res.end();
      console.log("User does not exist ");
      return;
    }
    let conversationId = mongoose.Types.ObjectId();
    console.log(conversationId);

    //initiate conversation bettween these freinds !
    const initiateConversation = new Conversation({
      _id: conversationId,
      participents: [requestedUsersId, myId],
      conversations: [],
    });

    await initiateConversation.save();

    //query to find both user's in db
    const findReciver = { _id: myId };
    const findSender = { _id: requestedUsersId };

    const freindobjForReciver = {
      freind: requestedUsersId,
      conversation: conversationId,
    };
    const freindObjForSender = {
      freind: myId,
      conversation: conversationId,
    };
    //query to to update Reciver
    const updateReciver = {
      $pull: { freindRequests: requestedUsersId }, //remove the user from freindRequests
      $push: { freinds: freindobjForReciver }, //Add the user to to freind list !
    };

    //query to update sender
    const updateSender = {
      $push: { freinds: freindObjForSender }, //Add the user to to freind list !
    };

    //perform the query to acept the request
    const updatedReciver = await User.updateOne(findReciver, updateReciver);
    const updatedSender = await User.updateOne(findSender, updateSender);

    //if All goes well return responce !
    if (updatedReciver.ok === 1 && updatedReciver.nModified === 1) {
      res.send({ info: "Requset acepted sucessfully !" });
      res.end();
      return;
    }

    //catch errors if any !
  } catch (error) {
    console.log("Error is ", error);
  }
});

module.exports = router;
