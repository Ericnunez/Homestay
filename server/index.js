import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/users.js";
import listingRoutes from "./routes/listings.js";
import auth from "./routes/auth.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/listings", listingRoutes);
app.use("/auth", auth);

const CONNECTION_URL = process.env.DB_STRING;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);
