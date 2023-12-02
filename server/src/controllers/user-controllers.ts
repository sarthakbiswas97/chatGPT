import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "OK", users });
  } catch (error) {
    res.status(404).json({ message: "ERROR", cause: error.message });
  }
};

//New user signup
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already exist");

    const hashedPassword = await hash(password, 10); // password encryption
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // removing the previous cookie first
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    // setting up the new cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    const token = createToken(user._id.toString(), user.email, "7d");
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: "User Created Successfully",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(404).json({ message: "ERROR", cause: error.message });
  }
};

// User Login
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User Not Found");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }


    // removing the previous cookie first
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    
    // setting up the new cookie

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);


    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "Successfully LoggedIn", email: user.email });
  } catch (error) {
    res.status(404).json({ message: "ERROR", cause: error.message });
  }
};
