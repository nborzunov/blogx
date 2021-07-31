const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.ObjectId,
    ref: "Post",
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  parentComment: {
    type: mongoose.ObjectId,
    ref: "Comment",
  },
  repliedTo: {
    type: mongoose.ObjectId,
    ref: "Comment",
  },
  replies: [{ type: mongoose.ObjectId, ref: "Comment" }],
});

CommentSchema.index({ text: "text" });

const Comment = mongoose.model("Comment", CommentSchema);

Comment.createIndexes();

module.exports = Comment;
