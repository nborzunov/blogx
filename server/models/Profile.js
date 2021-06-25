const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "user",
  },
  age: Number,
  country: String,
  city: String,
  following: [{ type: ObjectId, ref: "user" }],
  followers: [{ type: ObjectId, ref: "user" }],
  friends: [{ type: ObjectId, ref: "user" }],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
