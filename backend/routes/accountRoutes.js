import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} from "../controllers/accountController.js";

router.route("/").post(protect, admin, createAccount).get(protect, getAccounts);

router
  .route("/:id")
  .put(protect, admin, updateAccount)
  .delete(protect, admin, deleteAccount);
export default router;
