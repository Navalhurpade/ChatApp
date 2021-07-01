const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phoneNo: String,
  password: String,
  freinds: [
    {
      freind: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    },
  ],
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  freindRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
