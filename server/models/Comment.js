const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "user",
  },
  post: {
      type: ObjectId,
      ref: "post"
  },
  text: String,
  date: {
    type: Date,
    default: Date.now,
  },
  liked: [{ type: ObjectId, ref: "user" }],
  comments: [{ type: ObjectId, ref: "comment" }],
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
