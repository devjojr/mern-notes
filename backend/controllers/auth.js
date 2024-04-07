const User = require("../models/User");
const validator = require("validator");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const signup = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      userName: user.userName,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please provide an email and password");
    }

    if (!validator.isEmail(email)) {
      throw new BadRequestError("Invalid email");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid: user not found");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid password");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      userName: user.userName,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error)
  }
};

module.exports = { signup, login };
