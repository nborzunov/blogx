const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const axios = require("axios");
const Multer = require("multer");

const auth = require("../middleware/auth");
const getPageViews = require("../utils/getPageViews");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = express.Router();

let multer = require("multer");
let upload = multer();
const uploadFile = require("../utils/uploadFile");

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    }).populate("author", ["name", "surname"]);
    const comments = await Comment.find({ post: post }).sort({ date: -1 });

    const views = await getPageViews(`/post/${req.params.id}`);

    post.comments = comments;

    post.views = views;

    if (!post) {
      res.status(404).json({
        errors: [
          {
            msg: "Post not found",
          },
        ],
      });
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  upload.fields([
    {
      name: "title",
    },
    {
      name: "subtitle",
    },
    {
      name: "keywords",
    },
    {
      name: "previewImage",
    },
    {
      name: "body",
    },
  ]),
  auth,
  async (req, res) => {
    const body = req.body;
    const file = req.files.previewImage[0];

    // console.log(body);
    // console.log(file);

    try {
      function createPost(imageUrl) {
        const newPost = new Post({
          author: req.user.id,
          ...req.body,
          previewImage: imageUrl,
        });
  
        newPost.save();
        res.status(200).send(newPost);
      }
      uploadFile(file, createPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post("/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: new mongoose.Types.ObjectId(req.params.id) });
    const author = await User.findById({ _id: new mongoose.Types.ObjectId(req.user.id) });
    const newComment = await new Comment({
      author: author,
      post: post,
      text: req.body.message,
    });

    newComment.save();

    const comments = await Comment.find({ post: post });
    res.status(200).send(comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id/comment/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if (post.author._id == req.user.id) {
      await Comment.findOneAndRemove({ _id: new mongoose.Types.ObjectId(req.params.commentId) });
      res.json({ msg: "Comment deleted" });
    } else {
      res.status(400).send("You are not permitted");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
