export const createUser = (req, res) => {
  res.send("Creating a user");
};

export const getUsers = async (req, res) => {
  try {
    const listings = await User.find();

    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
