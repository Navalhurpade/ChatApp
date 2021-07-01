const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltingRounds = 10;

router.post("/register", async (req, res) => {
  const { phoneNo, name, password: plainTextPassword } = req.body;

  try {
    //Checking Wether Phone number Alredy Used
    const foundPhoneNo = await User.findOne({ phoneNo: phoneNo }).exec();

    //If either of phone or email is already used Return Bad request !
    if (foundPhoneNo) {
      console.log("user Already Exists !");
      res.send({ error: "Phone Alredy Used !" });
      return;
    }
  } catch (error) {
    console.log("Error while finding users existance !");
  }

  try {
    //If no User found Hashing PlainTextPassword
    const HashedPassword = await bcrypt.hash(plainTextPassword, saltingRounds);

    //Creating and Storing User in dataBase !
    const newUser = new User({
      name,
      phoneNo,
      password: HashedPassword,
    });

    await newUser.save();

    res.send({ info: "Registration sucsess !" });
    console.log("Succesfully registered user !");
  } catch (error) {
    console.log(
      "Error While Hashing password Or storing registration details !",
      error
    );
  }
  res.end();
});

router.post("/", async (req, res) => {
  let { phoneNo: recivedPhoneNo, password: plainTextPassword } = req.body;

  try {
    //Finding user in Database
    const foundUser = await User.findOne({ phoneNo: recivedPhoneNo });

    //If User not found return with //status code 400
    if (!foundUser) {
      res.send({ error: "User does not exist !" });
      res.end();
      return;
    }

    const { password: hashedPassword, name, phoneNo } = foundUser;

    //Compaire the password's Hash by with recived plainTextPassword
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);

    //If Password matches the HASH return Token !
    if (match) {
      const token = jwt.sign(
        {
          _id: foundUser._id,
          name: name,
          phoneNo: phoneNo,
        },
        process.env.APP_SECRETE
      );
      res.send(token);
      res.end();
      return;

      //else return Bad Request request e.i: Invalid Credential !
    } else {
      res.send({ error: "Invalid Credential" });
      res.end();
      return;
    }

    // Log errors if any
  } catch (error) {
    console.log(
      "Error While finding user in dataBase OR hashing the password !\n",
      error
    );
  }
});

module.exports = router;
