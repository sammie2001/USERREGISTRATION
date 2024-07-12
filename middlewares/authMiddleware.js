const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  const token = request.cookies?.cookieToken;

  if (!token) {
    return response
      .status(401)
      .json({ message: "Authentication error: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    return response
      .status(401)
      .json({ message: "Authentication error: Token invalid" });
  }
};

module.exports = authenticateToken;
