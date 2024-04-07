const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequestError, CreateError } = require("../errors");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide your username"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

// Index for email field to enforce uniqueness
// userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  try {
    if (!validator.isAlphanumeric(this.userName)) {
      throw new BadRequestError("Username must be alphanumeric");
    }

    if (!validator.isEmail(this.email)) {
      throw new BadRequestError("Please provide a valid email");
    }

    // Checking email uniqueness using a unique index in the database
    const emailInUse = await mongoose
      .model("User")
      .findOne({ email: this.email });
    if (emailInUse) {
      throw new CreateError("Email currently in use");
    }

    // Checking customized password strength
    if (!isPasswordStrongEnough(this.password)) {
      throw new BadRequestError(
        "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter"
      );
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error)
  }
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.userName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

function isPasswordStrongEnough(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

module.exports = mongoose.model("User", userSchema);
