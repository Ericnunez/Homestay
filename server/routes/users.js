import express from "express";
import { createUser, getUsers } from "../controllers/Users.js";

const router = express.Router();

router.get("/", createUser);
router.get("/getUsers", getUsers);

export default router;
