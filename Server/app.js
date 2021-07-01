require("dotenv").config();
const express = require("express");
const socketIo = require("socket.io");
const auth = require("./routes/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const request = require("./routes/request");
const User = require("./Models/User");
const Conversation = require("./Models/Conversation");
const retriveUsersData = require("./utils/sendLetestData");
const os = require("os");

//initialize Express
var IP = require("os").networkInterfaces().wlp3s0[0].address;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  process.env.CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, // <== Suspect Found !!!
  () => {
    console.log("Connected To MongoDB cluster !");
  }
);

//making a server to listen on port and storing the server
const Server = app.listen(8080, IP, (req, res) =>
  console.log(`Server is startet and listing on port http://${IP}:8080`)
);

//giving the server to socket io
const io = socketIo(Server);

let connectedUsers = [];

io.on("connection", (client) => {
  client.on("user-connected", async (id) => {
    console.log("user connected !", client.id);

    //retrive letest data from db
    const letestData = retriveUsersData(id);

    //checking if user is alredy in connected Users
    const foundConnectedUsr = connectedUsers.find(
      (usr) => usr._id === letestData._id
    );

    //if not adiing user to connected user
    if (!foundConnectedUsr)
      connectedUsers.unshift({ _id: letestData._id, sessionId: client.id });

    //send it back to client
    client.emit("get-letest-data", letestData);
  });

  client.on("send-messege", async (mesDetails) => {
    try {
      const { conversationId, text, sender } = mesDetails;
      const mesObj = { text, sender };

      //update the message into databases
      await Conversation.updateOne(
        { _id: conversationId },
        { $push: { conversations: mesObj } }
      );

      //retrive letest data from db
      const letestData = retriveUsersData(sender, "");

      //finding recivers ids in coversations
      const reciversIds = letestData.conversation.participents.filter(
        (_id) => _id !== sender
      );
      console.log("Recivers ides...", reciversIds);
      const reciversData = retriveUsersData(
        reciversIds[0],
        "",
        "text sender sendAt"
      );

      //cant find user
      if (!letestData) {
        client.emit("error-fallback");
      }

      //send it back to client - sender
      client.emit("get-letest-data", letestData);

      const foundUser = connectedUsers.find((usr) => usr._id === _id);
      if (!foundUser.length === 0)
        client.to(foundUser.sessionId).emit("get-letest-data", reciversData);
    } catch (error) {
      console.log("sending error", error);
    }
  });

  client.on("send-letest-data", () => {
    client.emit("get-letest-data");
  });
});

app.get("/", (req, res) => {
  res.send("Hey Got Working !");
});

app.use("/auth", auth);
app.use("/request", request);
