import express from "express";
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
      return res.status(400).send({ message: error.details[0].message });
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
      return res.status(400).send({ message: "Email already exists!" });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      email: req.body.email,
      password: hashPassword,
      profile: req.body.profile,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        _id: newUser._id,
        displayName: newUser.profile.displayName,
        email: newUser.email,
      },
      process.env.SECRET_TOKEN
    );
    res.status(201).json(token);
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
      return res.status(400).send({
        message: `There is no user with the email ${req.body.email} `,
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(409).json({ message: "Invalid Password" });

    const token = jwt.sign(
      {
        _id: user._id,
        displayName: user.profile.displayName,
        email: user.email,
      },
      process.env.SECRET_TOKEN
    );
    // const { _id: userId, displayName: name, email: email } = user;
    return res.send(token);

    // .header("x-auth-token", token)
    // .header("access-control-expose-headers", "x-auth-token")
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
