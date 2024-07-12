const routes = require("express").Router();
const authenticateToken = require("../middlewares/authMiddleware");

const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateProfile,
} = require("../controllers/userController");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/logout", logoutUser);
routes.get("/userprofile", authenticateToken, getUserProfile);
routes.put("/update", authenticateToken, updateProfile);

module.exports = routes;
