import express from "express";

import { protect } from "../middlewares/authMiddleware.js";

import detectIntent from "../controllers/chatbot.js";
const router = express.Router();

router.post("/detectIntent", async (req, res) => {
  const { message, sessionId } = req.body;
  const result = await detectIntent(message, sessionId);
  res.send(result);
});

export default router;
