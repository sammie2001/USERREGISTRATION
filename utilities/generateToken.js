const jwt = require("jsonwebtoken");

const generateToken = (response, user_id) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  response.cookie("cookieToken", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    sameSite: "Strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateToken;
