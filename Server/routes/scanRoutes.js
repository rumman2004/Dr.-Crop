import express from "express";

import {
  analyzeCrop,
  getScanById,
  getScanHistory,
} from "../controller/uploadController.js";
import uploadCropImage from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/analyze", uploadCropImage.single("image"), analyzeCrop);
router.get("/history", getScanHistory);
router.get("/:id", getScanById);

export default router;
