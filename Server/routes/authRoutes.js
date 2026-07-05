import { Router } from "express";
import multer from "multer";

import {
  getProfile,
  googleSignIn,
  login,
  signup,
  updateProfile,
  uploadAvatar,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 },
});

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleSignIn);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/avatar", protect, upload.single("avatar"), uploadAvatar);

export default router;
