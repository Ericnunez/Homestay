import express from "express";
import userRoutes from "./routes/users.js";
import listingRoutes from "./routes/listings.js";
import auth from "./routes/auth.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/listings", listingRoutes);
router.use("/auth", auth);

export default router;
