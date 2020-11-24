import express from "express";
import mongoose from "mongoose";
import { createListingValidation } from "../validation/listingValidation.js";

import Listing from "../models/Listing.js";

const router = express.Router();

export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();

    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getListing = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const { error } = createListingValidation(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { title, description, price, image, creator, tags } = req.body;

    const newListing = new Listing({
      title,
      description,
      image,
      creator,
      tags,
      price,
    });

    await newListing.save();

    res.status(201).json(newListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, image, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Listing with id: ${id}`);

  const updatedListing = {
    creator,
    title,
    description,
    tags,
    image,
    _id: id,
  };
  try {
    await Listing.findByIdAndUpdate(id, updatedListing, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

  res.json(updatedPost);
};

export const deleteListing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Listing with id: ${id}`);

  try {
    await PostMessage.findByIdAndRemove(id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

  res.json({ message: "Post deleted successfully." });
};

export default router;
