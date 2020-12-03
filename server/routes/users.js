import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getUserProfile, getUsers } from "../controllers/Users.js";

const router = express.Router();

// router.get("/", createUser);
router.get("/getUsers", getUsers);
router.post("/getUserProfile", verifyToken, getUserProfile);

export default router;
