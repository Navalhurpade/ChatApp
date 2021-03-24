const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltingRounds = 10;

router.post("/register", (req, res) => {
  const { phoneNo, email, name, password, freinds } = req.body;

  const recivedEmail = email.toLowerCase();

  async function findOrStore() {
    try {
      //Checking Wether the Email Or Phone number Alredy Used
      const foundPhoneNo = await User.findOne({ phoneNo: phoneNo }).exec();
      const foundEmail = await User.findOne({ email: recivedEmail }).exec();

      //If either of phone or email is already used Return Bad request !
      if (foundPhoneNo || foundEmail) {
        console.log("user Already Exists !");
        res.send({ error: "Phone Or Email Alredy Used !" });
        return;
      }
    } catch (error) {
      console.log("Error while finding users existance !");
    }

    try {
      //If no User found Hashing PlainTextPassword
      const HashedPassword = await bcrypt.hash(password, saltingRounds);

      //Creating and Storing User in dataBase !
      const newUser = new User({
        email,
        name,
        phoneNo,
        password: HashedPassword,
        freinds,
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
  }
  findOrStore();
});

router.post("/", (req, res) => {
  let {
    phoneNo: recivedPhoneNo,
    email,
    password: plainTextPassword,
  } = req.body;

  async function findAndVerifyUser() {
    try {
      const recivedEmail = email.toLowerCase();

      //Finding user in Database
      const foundUser = recivedPhoneNo
        ? await User.findOne({ phoneNo: recivedPhoneNo })
        : await User.findOne({ email: recivedEmail });

      //If User not found return with status code 400
      if (!foundUser) {
        res.send({ error: "User does not exist !" });
        res.end();
        return;
      }

      const {
        password: hashedPassword,
        name,
        email: foundEmail,
        phoneNo,
        freinds,
        freindRequests,
      } = foundUser;

      //Compaire the password's Hash by with recived plainTextPassword
      const match = await bcrypt.compare(plainTextPassword, hashedPassword);

      //If Password matches the HASH return Token !
      if (match) {
        const token = jwt.sign(
          {
            _id: foundUser._id,
            name: name,
            email: foundEmail,
            phoneNo: phoneNo,
            freinds: freinds,
            freindRequests: freindRequests,
          },
          process.env.APP_SECRETE
        );
        res.send(token);
        res.end();
        return;

        //else return Bad Request responce e.i: Invalid Credential !
      } else {
        res.status(400);
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
  }

  findAndVerifyUser();
});

module.exports = router;
