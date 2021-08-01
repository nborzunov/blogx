const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String
  },
  age: Number,
  country: String,
  city: String,
  aboutme: String,
  posts: [{ type: mongoose.ObjectId, ref: "Post" }],
  following: [{ type: mongoose.ObjectId, ref: "User" }],
  friends: [{ type: mongoose.ObjectId, ref: "User" }],
});


ProfileSchema.index({ fullName: "text"});

const Profile = mongoose.model("Profile", ProfileSchema);

Profile.createIndexes();

module.exports = Profile;
