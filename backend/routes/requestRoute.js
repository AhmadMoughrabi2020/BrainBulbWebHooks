import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";

import {
  createRequest,
  getRequests,
  getUnread,
  updateRequest,
} from "../controllers/requestController.js";

router.route("/").post(protect, createRequest).get(protect, admin, getRequests);
router.route("/:id").put(protect, admin, updateRequest);
router.route("/unread").get(protect, admin, getUnread);

export default router;
