const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// get user by id
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// login
router.post(
  "/login",
  [
    check("email").isEmail().withMessage({
      field: "email",
      msg: "Please include a valid email",
    }),
    check("password").exists().withMessage({
      field: "password",
      msg: "Password is required",
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              field: "email",
              msg: "Wrong email",
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              field: "password",
              msg: "Wrong password",
            },
          ],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecretKey"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;

        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/signup",
  [
    check("name").not().isEmpty().isLength({ min: 4, max: 40 }).withMessage({
      field: "name",
      msg: "Name is required",
    }),
    check("surname").not().isEmpty().isLength({ min: 4, max: 40 }).withMessage({
      field: "surname",
      msg: "Surname is required",
    }),
    check("email").isEmail().withMessage({
      field: "email",
      msg: "Please include a valid email",
    }),
    check("password").isLength({ min: 6 }).withMessage({
      field: "password",
      msg: "Please enter a password with 6 or more characters",
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [
            {
              field: "email",
              msg: "User with this email is already exist",
            },
          ],
        });
      }

      user = new User({
        name,
        surname,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecretKey"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;

        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
