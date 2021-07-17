const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", auth, async (req, res) => {});

router.post("/", auth, async (req, res) => {
    try{

        const newPost = new Post({
            author: req.user.id,
            ...req.body
        })

        newPost.save();
        res.status(200).send(newPost);
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
