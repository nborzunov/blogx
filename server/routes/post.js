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
    const comments = await Comment.find({ post: post, parentComment: undefined })
      .populate("author", ["name", "surname"])
      .populate({
        path: "replies",
        select: "-post -parentComment",
        populate: [
          {
            path: "author",
            model: "User",
            select: "name surname",
          },
          {
            path: "repliedTo",
            model: "Comment",
            select: "author",
            populate: {
              path: "author",
              model: "User",
              select: "name surname",
            },
          },
        ],
      })
      .sort({ date: -1 });

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
  [
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
  ],
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

    if (!post) {
      res.status(400).send("Post not found");
    }

    if (!author) {
      res.status(400).send("You are not authorized");
    }

    if (!req.body.message) {
      res.status(400).send("Empty message");
    }

    const newComment = await new Comment({
      author: author,
      post: post,
      text: req.body.message,
    });

    await newComment.save();

    const comments = await Comment.find({ post: post, parentComment: undefined })
      .populate("author", ["name", "surname"])
      .populate({
        path: "replies",
        select: "-post -parentComment",
        populate: [
          {
            path: "author",
            model: "User",
            select: "name surname",
          },
          {
            path: "repliedTo",
            model: "Comment",
            select: "author",
            populate: {
              path: "author",
              model: "User",
              select: "name surname",
            },
          },
        ],
      })
      .sort({ date: -1 });
    res.status(200).send(comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/:postId/comment/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: new mongoose.Types.ObjectId(req.params.postId) });
    const author = await User.findById({ _id: new mongoose.Types.ObjectId(req.user.id) });
    const comment = await Comment.findById({ _id: new mongoose.Types.ObjectId(req.params.commentId) });

    if (!post) {
      res.status(400).send("Post not found");
    }

    if (!author) {
      res.status(400).send("You are not authorized");
    }

    if (!comment) {
      res.status(400).send("Replying comment is currently unavailable");
    }

    if (!req.body.message) {
      res.status(400).send("Empty message");
    }

    let newComment = await new Comment({
      author: author,
      post: post,
      parentComment: !comment.parentComment ? comment : comment.parentComment,
      repliedTo: comment.parentComment ? comment : null,
      text: req.body.message
    })
    await newComment.save();

    if(!comment.parentComment){
      comment.replies = await [...comment.replies, newComment];
    } else {
      const parentComment = await Comment.findById({ _id: new mongoose.Types.ObjectId(comment.parentComment) });

      parentComment.replies = [...parentComment.replies, newComment];

      await parentComment.save();
    }
    await comment.save();


    const comments = await Comment.find({ post: post, parentComment: undefined })
      .populate("author", ["name", "surname"])
      .populate({
        path: "replies",
        select: "-post -parentComment",
        populate: [
          {
            path: "author",
            model: "User",
            select: "name surname",
          },
          {
            path: "repliedTo",
            model: "Comment",
            select: "author",
            populate: {
              path: "author",
              model: "User",
              select: "name surname",
            },
          },
        ],
      })
      .sort({ date: -1 });

    res.status(200).send(comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id/comment/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: new mongoose.Types.ObjectId(req.params.id) });
    const comment = await Comment.findById({ _id: new mongoose.Types.ObjectId(req.params.commentId) });

    if ((post.author == req.user.id) || (req.user.id == comment.author)) {

      if(comment.replies.length > 0 && !comment.parentComment) {
        comment.replies.map(async (reply) => {
          await Comment.deleteOne({ _id: new mongoose.Types.ObjectId(reply) })
        });
      }

      await Comment.findOneAndRemove({ _id: new mongoose.Types.ObjectId(req.params.commentId) });

      const comments = await Comment.find({ post: post, parentComment: undefined })
      .populate("author", ["name", "surname"])
      .populate({
        path: "replies",
        select: "-post -parentComment",
        populate: [
          {
            path: "author",
            model: "User",
            select: "name surname",
          },
          {
            path: "repliedTo",
            model: "Comment",
            select: "author",
            populate: {
              path: "author",
              model: "User",
              select: "name surname",
            },
          },
        ],
      })
      .sort({ date: -1 });

    res.status(200).send(comments);
    } else {
      res.status(400).send("You are not permitted");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
