const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "user",
  },
  post: {
      type: mongoose.ObjectId,
      ref: "post"
  },
  text: String,
  date: {
    type: Date,
    default: Date.now,
  },
  liked: [{ type: mongoose.ObjectId, ref: "user" }],
  comments: [{ type: mongoose.ObjectId, ref: "comment" }],
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
