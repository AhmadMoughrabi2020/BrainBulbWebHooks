import express from "express";
const router = express.Router();
import {
  createPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll,
} from "../controllers/payrollController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
router.route("/").post(protect, createPayroll).get(protect, getPayrolls);

router
  .route("/:id")
  .put(protect, admin, updatePayroll)
  .delete(protect, admin, deletePayroll);
export default router;
