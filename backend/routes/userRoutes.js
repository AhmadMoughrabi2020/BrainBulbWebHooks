import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, registerUser)
  .get(protect, admin, getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);
router.post("/login", authUser);

export default router;
