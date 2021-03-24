const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  createdAt: Date,
  sender: {
    name: String,
    id: String,
  },
  reciver: {
    name: String,
    id: String,
  },
});

export const Message = mongoose.model("Message", messageSchema);
