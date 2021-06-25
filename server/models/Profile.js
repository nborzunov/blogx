const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "user",
  },
  age: Number,
  country: String,
  city: String,
  avatar: String,
  following: [{ type: mongoose.ObjectId, ref: "user" }],
  friends: [{ type: mongoose.ObjectId, ref: "user" }],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
