const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const { Socket } = require("socket.io");

//initialize Express
const app = express();

//making a server to llisten on port and storing the server
const ip = "192.168.9.228";
// const Server = http.createServer(app)

const Server = app.listen(8080, ip, (req, res) =>
  console.log("Server is startet and listing on port 8080")
);

//giving the server to socket io
const io = socketIo(Server);
let currentUser = "";

io.on("connection", (client) => {
  client.on("new-user-connect", (name) => {
    console.log(name + " joined the chat !");
    currentUser = name;
    client.broadcast.emit("new-user-connect", name);
  });

  // client.on("user-disconnect", (user) => {
  //   console.log(user + " leaved the chat !");
  //   client.broadcast.emit("user-disconnect", user);
  // });

  client.on("message-send", (massage) => {
    client.broadcast.emit("message-recive", massage);
  });

  client.on("disconnect", () => {
    console.log(currentUser + " is Disconnected !");
    client.broadcast.emit("user-disconnect", currentUser);
  });

  client.on("disconnecting", () => {
    console.log(currentUser + " is Disconnecting !");
    client.broadcast.emit("user-disconnect", currentUser);
  });
});

app.get("/", (req, res) => {
  res.send("Hey Got Working !");
});
