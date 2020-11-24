import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} from "../controllers/listings.js";

const router = express.Router();

router.get("/", verifyToken, getListings);
router.get("/:id", verifyToken, getListing);
router.post("/", verifyToken, createListing);
router.patch("/:id", verifyToken, updateListing);
router.delete("/:id", verifyToken, deleteListing);

export default router;
