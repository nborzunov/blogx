const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "user",
  },
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  liked: [{ type: ObjectId, ref: "user" }],
  comments: [{ type: ObjectId, ref: "comment" }],
});

module.exports = Post = mongoose.model("post", PostSchema);
