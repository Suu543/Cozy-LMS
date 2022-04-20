import User from "../models/user";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/auth";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //   Validation
    if (!name) {
      return res.status(400).send("Name is required...");
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters");
    }

    // let userExist = await user.findOne({ email });
    // does exactly as the before line does, but you get a better stack trace if any error happened
    let userExist = await User.findOne({ email }).exec();

    if (userExist) {
      return res.status(400).send("Email is taken...");
    }

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("Saved User: ", user);

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try Again!!");
  }
};

/**
 * Server
 * To login user, we need to check if user's password is correct.
 * We need to take user's password, hash it then compare with the hashed password saved in Database
 * Then we need to generate json web token / JWT and send to client
 * This will be used to access protected routes
 *
 * npm install jsonwebtoken
 */

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send("User Not Found...");
    }

    // Check Password
    const match = await comparePassword(password, user.password);

    // Create Signed JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return user and token to client, exclude hashed password
    user.password = undefined;

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });

    // Send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try Again...");
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout Success" });
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    console.log("CURRENT_USER", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
