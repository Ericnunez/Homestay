import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  registerValidation,
  loginValidation,
} from "../validation/validation.js";
import User from "../models/User.js";

const router = express.Router();

export const createUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email already exists!");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send(`There is no user with the email ${req.body.email} `);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(409).json({ message: "Invalid Password" });

    const token = jwt.sign(
      {
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
      process.env.SECRET_TOKEN
    );
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
