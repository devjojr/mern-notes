const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token Payload:", payload);
    req.user = {
      userId: payload.userId,
      userName: payload.userName,
    };
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new UnauthenticatedError("Authentication failed");
  }
};

module.exports = auth;
