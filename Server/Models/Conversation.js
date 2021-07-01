const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  participents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
  conversations: [
    {
      text: String,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
      },
      reciver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
      },
      sendAt: { type: Date, default: Date.now() },
      unique: false,
    },
  ],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
