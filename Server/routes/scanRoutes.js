import { Router } from "express";
import multer from "multer";

import {
  analyzeCrop,
  deleteScan,
  getScanById,
  getScanHistory,
} from "../controller/scanController.js";
import { protect } from "../middleware/authMiddleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 },
});

const router = Router();

/* All scan routes require authentication */
router.use(protect);

router.post("/analyze", upload.single("image"), analyzeCrop);
router.get("/history", getScanHistory);
router.get("/:id", getScanById);
router.delete("/:id", deleteScan);

export default router;
