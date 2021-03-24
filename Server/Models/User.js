const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNo: String,
  password: String,
  freinds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  ],
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  freindRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  ],
  messages: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
