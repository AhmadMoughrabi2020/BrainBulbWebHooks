import express from "express";
const router = express.Router();
import {
  createSettledPayrolls,
  getSettledPayrolls,
} from "../controllers/settledPayrollController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, createSettledPayrolls)
  .get(protect, getSettledPayrolls);
export default router;
