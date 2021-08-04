const express = require("express");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = express.Router();

let multer = require("multer");
let upload = multer();
const uploadFile = require("../utils/uploadFile");

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
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "surname", "avatar"]);


    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    profile.avatar = profile.user.avatar;
    
    res.status(200).send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update main user data
router.put(
  "/",
  [
    auth,
    upload.fields([
      {
        name: "age",
      },
      {
        name: "country",
      },
      {
        name: "city",
      },
      {
        name: "avatar",
      },
      {
        name: "aboutme",
      },
    ]),
  ],
  async (req, res) => {
    const { age, country, city, aboutme } = req.body;



    const profileFields = req.body;
    profileFields.user = req.user.id;

    try {
      let user = await User.findById({ _id: new mongoose.Types.ObjectId(req.user.id) });

      async function saveAvatar(imageUrl) {
        user.avatar = imageUrl;

        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: {
              ...profileFields,
              avatar: imageUrl,
            },
          },
          { new: true, upsert: true }
        );
        
        user.save();
        profile.save();

        res.status(200).send(profile);
      }

      if(req.files.avatar) {
        uploadFile(req.files.avatar[0], saveAvatar);
      } else {
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: {
              ...profileFields
            },
          },
          { new: true, upsert: true }
        );
        
        profile.save();
      }
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

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
