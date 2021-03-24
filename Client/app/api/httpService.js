import { io } from "socket.io-client";

const ConnectionURI = "http://192.168.9.228:8080";

const socket = io(ConnectionURI);

export const notifyUserJoined = async (user) => {
  socket.emit("new-user-connect", user);
};

export const notifyUserLeave = async (user) => {
  socket.emit("user-disconnect", user);
};

export const sendMessage = (message, _id, user) => {
  socket.emit("message-send", { message, _id, sender: user });
};

export const waitformessage = async (callback) => {
  await socket.on("message-recive", (message) => {
    callback(message);
  });
};

export const waitForNewUser = async (callback) => {
  await socket.on("new-user-connect", (user) => {
    callback(user);
  });
};

export const waitForUserLeave = async (callback) => {
  await socket.on("user-disconnect", (user) => {
    callback(user);
  });
};

export const waitForLetestData = async (callback) => {
  await socket.on("get-letest-data", (data) => {
    callback(data);
  });
};
