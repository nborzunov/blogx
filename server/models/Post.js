const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  keywords: String,
  previewImage: String,
  body: String,
  date: {
    type: Date,
    default: Date.now,
  },
  views: Number,
  liked: [{ type: mongoose.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.ObjectId, ref: "Comment" }],
});

PostSchema.index({ title: "text", subtitle: "text", keywords: "text", body: "text" });

const Post = mongoose.model("Post", PostSchema);

Post.createIndexes();

module.exports = Post;
