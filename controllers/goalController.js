const mongoose = require("mongoose");
const express = require("express");
const Goal = require("../models/goalModel");
const { loginUser } = require("./userController");

const createGoal = async (request, response) => {
  try {
    const { title, description } = request.body;

    if (!title || !description) {
      return response
        .status(400)
        .json({ message: `Provide the required information` });
    }

    const newGoal = new Goal({
      userId: request.user.user_id,
      title,
      description,
    });

    const saveGoal = await newGoal.save();

    return response.status(201).json(saveGoal);
  } catch (error) {
    return response.status(500).json({
      mmessage: error.message,
      stack: error.stack,
    });
  }
};

const getAllGoals = async (request, response) => {
  try {
    const userId = request.user.user_id;

    const goals = await Goal.find({ userId: userId });
    console.log(userId);

    if (!goals) {
      return response.status(404).json({ error: `User ID does not exist` });
    }

    return response.status(200).json(goals);
  } catch (error) {
    return response.status(500).json({
      mmessage: error.message,
      stack: error.stack,
    });
  }
};

const updategoal = async (request, response) => {
  try {
  } catch (error) {
    return response.status(500).json({
      mmessage: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  createGoal,
  getAllGoals,
};
