import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    displayName: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
