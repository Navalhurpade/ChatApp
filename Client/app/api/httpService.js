import { io } from "socket.io-client";

const ConnectionURI = "http://192.168.23.228:8080";

const socket = io(ConnectionURI);

export const notifyUserJoined = async (user) => {
  socket.emit("user-connected", user);
};

export const notifyUserLeave = async (user) => {
  socket.emit("user-disconnect", user);
};

export const sendMessage = (text, coversationId, user) => {
  socket.emit("send-messege", {
    text,
    conversationId: coversationId,
    sender: user,
  });
};

export const waitformessage = async (callback) => {
  await socket.on("message-recive", (message) => {
    callback(message);
  });
};

export const waitForLetestData = async (callback) => {
  await socket.on("get-letest-data", (data) => {
    callback(data);
  });
};

export const fallbackToLogin = (cb) => {
  socket.on("error-fallback", () => {
    cb();
  });
};

export const updateConversation = (cb) => {
  socket.on("conversation-updated", (conversation) => {
    cb(conversation);
  });
};

export const sendLetestData = () => {
  socket.emit("send-letest-data");
};
