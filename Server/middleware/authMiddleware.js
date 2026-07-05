import jwt from "jsonwebtoken";

import User from "../models/User.js";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing. Add it to Server/.env.");
  }

  return secret;
};

export const generateToken = (userId) =>
  jwt.sign({ id: userId }, getJwtSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });

export const protect = async (req, _res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("Not authorised. No token provided.");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findById(decoded.id);

    if (!user) {
      const error = new Error("Not authorised. User not found.");
      error.statusCode = 401;
      throw error;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastReset = new Date(user.lastCreditReset || Date.now());
    lastReset.setHours(0, 0, 0, 0);

    // Top up the free daily allowance to 5 on a new day, but never reduce a
    // balance that is already above 5 — this preserves purchased/top-up credits.
    if (today > lastReset) {
      if (user.credits < 5) {
        user.credits = 5;
      }
      user.lastCreditReset = new Date();
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Not authorised. Token is invalid or expired.";
    }

    next(error);
  }
};
