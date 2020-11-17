import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    creator: {
      type: String,
      required: true,
      minlength: 5,
    },
    tags: [String],
    image: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
