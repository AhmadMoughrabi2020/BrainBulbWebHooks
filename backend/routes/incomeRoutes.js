import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  createIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
  getOneIncome,
} from "../controllers/incomeController.js";

router.route("/").post(protect, createIncome).get(protect, getIncomes);

router
  .route("/:id")
  .put(protect, admin, updateIncome)
  .delete(protect, admin, deleteIncome)
  .get(protect, admin, getOneIncome);
export default router;
