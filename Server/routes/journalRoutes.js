import { Router } from "express";

import { getJournals, forceGenerate } from "../controller/journalController.js";

const router = Router();

/* Public — anyone can read journal entries */
router.get("/", getJournals);

/* Debug — force generate today's entry */
router.post("/generate", forceGenerate);

export default router;
