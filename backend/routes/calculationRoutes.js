import express from "express";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";
import {
  getYearlyData,
  getMonthlyData,
  getRangeData,
} from "../controllers/calculationController.js";

router.route("/yearly").get(protect, getYearlyData);
router.route("/monthly").get(protect, getMonthlyData);
router.route("/range").get(protect, getRangeData);
export default router;
