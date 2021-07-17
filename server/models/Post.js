const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "user",
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
  views: {
    type: Number,
    default: 0,
  },
  liked: [{ type: mongoose.ObjectId, ref: "user" }],
  comments: [{ type: mongoose.ObjectId, ref: "comment" }],
});

module.exports = Post = mongoose.model("post", PostSchema);
