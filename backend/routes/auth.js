const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many requests, please try again later.",
  },
});

const { signup, login } = require("../controllers/auth");

router.post("/signup", apiLimiter, signup);
router.post("/login", apiLimiter, login);

module.exports = router;
