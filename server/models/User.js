import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    profile: {},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
