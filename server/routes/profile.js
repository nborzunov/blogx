const express = require("express");
const request = require("request");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = express.Router();

// Get all profiles
router.get("/all", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Get current profile
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update main user data
router.post("/", [auth], async (req, res) => {
  console.log(req.body);
  const { age, country, city, avatar } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;

  if (age) profileFields.age = age;
  if (country) profileFields.country = country;
  if (city) profileFields.city = city;
  if (avatar) profileFields.avatar = avatar;

  try {
    let profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true, upsert: true });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get one profile
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "surname", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    let followers = await Profile.find({ following: { $all: [req.params.user_id] } }).length;

    let posts = await Post.find({ author: req.params.user_id });

    let comments = await Comment.find({ author: req.params.user_id }).length;

    let newestPost = await Post.findOne({ author: req.params.user_id }).findOne({}, { sort: { date: -1 } });

    let mostLikedPost = await Post.findOne({ author: req.params.user_id }).sort({ liked: -1 });

    let mostPopularPost = await Post.findOne({ author: req.params.user_id }).sort({ views: -1 });

    let dates = await Post.find({ author: req.params.user_id }).map((post) => post.date);

    const data = {
      id: profile._id,
      user: profile.user,
      country: profile.country,
      city: profile.city,
      avatar: profile.avatar,
      age: profile.age,
      followers: followers,
      following: profile.following.length,
      posts: posts,
      comments: comments,
      newestPost: newestPost,
      mostLikedPost: mostLikedPost,
      mostPopularPost: mostPopularPost,
      dates: [],
    };

    res.json(data);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });

    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
