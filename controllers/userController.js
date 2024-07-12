const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../utilities/generateToken");
const User = require("../models/userGoals");

const registerUser = async (request, response) => {
  const { name, username, email, password } = request.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    response.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return response.status(500).json({
      mmessage: error.message,
      stack: error.stack,
    });
  }
};

const loginUser = async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return response
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    generateToken(response, user._id);
    response.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    return response.status(500).json({
      mmessage: error.message,
      stack: error.stack,
    });
  }
};

const logoutUser = async (request, response) => {
  try {
    const token = request.cookies?.cookieToken;
    if (!token) {
      return response.status(400).json({ message: "Failed to Log out" });
    }

    response.clearCookie("cookieToken");

    response.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

const getUserProfile = async (request, response) => {
  try {
    const userId = request.user.user_id;

    const user = await User.findById(userId).select("-password"); // Exclude the password field

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

const updateProfile = async (request, response) => {
  try {
    const userId = request.user.user_id;

    const { name, username, email } = request.body;

    if (!name || !username || !email) {
      return response.status(400).json({ message: "No fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...request.body },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateProfile,
};
