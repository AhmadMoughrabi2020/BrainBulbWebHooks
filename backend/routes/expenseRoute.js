import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getOneExpense,
} from "../controllers/expenseController.js";

router.route("/").post(protect, createExpense).get(protect, getExpenses);

router
  .route("/:id")
  .put(protect, admin, updateExpense)
  .delete(protect, admin, deleteExpense)
  .get(protect, admin, getOneExpense);
export default router;
