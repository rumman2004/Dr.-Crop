import { OAuth2Client } from "google-auth-library";

import { generateToken } from "../middleware/authMiddleware.js";
import { uploadImageBuffer } from "../services/cloudinaryService.js";
import User from "../models/User.js";

const formatUserResponse = (user, token) => ({
  success: true,
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    authProvider: user.authProvider,
    credits: user.credits,
    createdAt: user.createdAt,
  },
});

/* ── Email / Password signup ── */
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Name, email, and password are required.");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters.");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("An account with this email already exists.");
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      authProvider: "local",
      isVerified: true,
    });

    const token = generateToken(user._id);
    res.status(201).json(formatUserResponse(user, token));
  } catch (error) {
    next(error);
  }
};

/* ── Email / Password login ── */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("Invalid email or password.");
      error.statusCode = 401;
      throw error;
    }

    if (user.authProvider === "google") {
      const error = new Error(
        "This account uses Google Sign-In. Please sign in with Google.",
      );
      error.statusCode = 400;
      throw error;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      const error = new Error("Invalid email or password.");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user._id);
    res.json(formatUserResponse(user, token));
  } catch (error) {
    next(error);
  }
};

/* ── Google Sign-In ── */
export const googleSignIn = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      const error = new Error("Google ID token is required.");
      error.statusCode = 400;
      throw error;
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
      const error = new Error("Google Sign-In is not configured on the server.");
      error.statusCode = 500;
      throw error;
    }

    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      const error = new Error("Google account does not have an email.");
      error.statusCode = 400;
      throw error;
    }

    let user = await User.findOne({
      $or: [{ googleId }, { email }],
    });

    if (user) {
      /* Update Google ID and avatar if missing */
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
      }

      if (picture && !user.avatar) {
        user.avatar = picture;
      }

      await user.save();
    } else {
      user = await User.create({
        name: name || "Dr. Crop User",
        email,
        googleId,
        avatar: picture || "",
        authProvider: "google",
        isVerified: true,
      });
    }

    const token = generateToken(user._id);
    res.json(formatUserResponse(user, token));
  } catch (error) {
    if (error.message?.includes("Token used too late")) {
      error.statusCode = 401;
      error.message = "Google token has expired. Please sign in again.";
    }

    next(error);
  }
};

/* ── Get current user profile ── */
export const getProfile = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      authProvider: req.user.authProvider,
      credits: req.user.credits,
      createdAt: req.user.createdAt,
    },
  });
};

/* ── Upload avatar ── */
export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Please upload an image.");
      error.statusCode = 400;
      throw error;
    }

    const result = await uploadImageBuffer(req.file, "dr-crop-mobile/avatars");
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: result.secure_url },
      { new: true },
    );

    res.json({
      success: true,
      avatar: user.avatar,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        authProvider: user.authProvider,
        credits: user.credits,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* ── Update profile (name) ── */
export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      const error = new Error("Name is required.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim() },
      { new: true },
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        authProvider: user.authProvider,
        credits: user.credits,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
