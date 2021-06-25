const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "user",
  },
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  liked: [{ type: mongoose.ObjectId, ref: "user" }],
  comments: [{ type: mongoose.ObjectId, ref: "comment" }],
});

module.exports = Post = mongoose.model("post", PostSchema);
