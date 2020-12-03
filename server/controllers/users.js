import User from "../models/User.js";

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
