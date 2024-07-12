const router = require("express").Router();
const authenticateToken = require("../middlewares/authMiddleware");

const { createGoal, getAllGoals } = require("../controllers/goalController");

router.post("/create", authenticateToken, createGoal);
router.get("/all", authenticateToken, getAllGoals);

module.exports = router;
