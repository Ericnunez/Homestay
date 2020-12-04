import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const listings = await User.find();

    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    res.status(200).json(user.profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.decode(token);

    const profile = req.body;
    const user = await User.findOne({ _id: decoded._id });
    for (const prop in profile) {
      user.profile[`${prop}`] = profile[prop];
    }
    user.markModified("profile");
    const update = await user.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
