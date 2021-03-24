require("dotenv").config();
const express = require("express");
const socketIo = require("socket.io");
const auth = require("./routes/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const request = require("./routes/request");
const { getletestData } = require("./utils/getUsersData");

//initialize Express
const ip = "192.168.9.228"; // "192.168.9.228";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  process.env.CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected To MongoDB cluster !");
  }
);

//making a server to listen on port and storing the server
const Server = app.listen(8080, ip, (req, res) =>
  console.log(`Server is startet and listing on port http://${ip}:8080`)
);

//giving the server to socket io
const io = socketIo(Server);
let currentUser = "";

io.on("connection", (client) => {
  client.on("new-user-connect", async (usersData) => {
    console.log("user connected !", usersData);
    const letestData = await getletestData();
    client.emit("get-letest-data");
  });

  client.on("disconnect", () => {
    // console.log(currentUser + " is Disconnected !");
    client.broadcast.emit("user-disconnect", currentUser);
  });

  client.on("message-send", (massage) => {
    client.broadcast.emit("message-recive", massage);
  });
});

app.get("/", (req, res) => {
  res.send("Hey Got Working !");
});

app.use("/auth", auth);
app.use("/request", request);
