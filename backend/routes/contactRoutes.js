import express from "express";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";
import { messageDeliver } from "../controllers/contact.js";

router.route("/").post(messageDeliver);

export default router;
