const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

router.get("/posts", async (req, res) => {
  const { page, query } = req.query;
  const skip = (page - 1) * 10;

  try {
    const all = await Post.find({ $text: { $search: query } });
    const results = await Post.find({ $text: { $search: query } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(10);

    res.json({
      length: all.length,
      items: results.length,
      data: results,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/people", async (req, res) => {
  const { page, query } = req.query;
  const skip = (page - 1) * 10;

  try {
    const all = await Profile.find({ $text: { $search: query } });
    const results = await Profile.find({ $text: { $search: query } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(10);

    res.json({
      length: all.length,
      items: results.length,
      data: results,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/comments", async (req, res) => {
  const { page, query } = req.query;
  const skip = (page - 1) * 10;

  try {
    const all = await Comment.find({ $text: { $search: query } });
    const results = await Comment.find({ $text: { $search: query } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(10);

    res.json({
      length: all.length,
      items: results.length,
      data: results,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
