require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoutes");
const goalRouter = require("./routes/goalRoutes");
const app = express();

const PORTAL = process.env.PORT || 1000;

// middleware
app.use(express.json());

// cookies
app.use(cookieParser());

// path or routes connection
app.use("/user/database", userRouter);
app.use("/goal/database", goalRouter);

mongoose
  .connect(process.env.LINKS)
  .then((database) => {
    console.log(
      `MongoDB connected successfully on: ${database.connection.host}`
    );

    app.listen(PORTAL, () => {
      console.log(`Server is running on port ${PORTAL}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
