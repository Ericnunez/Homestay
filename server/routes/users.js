import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  getUserProfile,
  getUsers,
  updateUserProfile,
} from "../controllers/Users.js";

const router = express.Router();

// router.get("/", createUser);
router.get("/getUsers", getUsers);
router.post("/getUserProfile", verifyToken, getUserProfile);
router.post("/updateUserProfile", verifyToken, updateUserProfile);

export default router;
